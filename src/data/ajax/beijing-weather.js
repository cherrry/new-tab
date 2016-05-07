import $ from 'cheerio'
import { sprintf } from 'sprintf-js'

let domSource = function () {
  return fetch('http://www.weather.com.cn/weather/101010100.shtml')
    .then(function (response) {
      return response.blob()
    })
    .then(function (blob) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()

        reader.onload = function () {
          resolve(reader.result)
        }

        reader.onerror = function () {
          reject(reader.error)
        }

        reader.readAsText(blob)
      })
    })
    .then(function (html) {
      return $('.c7d > ul', html)
    })
}

let getTemp = function () {
  let reTemp = /^\s*(-?\d+)/

  return function (text) {
    return parseInt(text.replace(reTemp, '$1'))
  }
}()

let getDay = function () {
  let reDay = /^\s*(\d+)/

  return function (text) {
    return parseInt(text.replace(reDay, '$1'))
  }
}()

let nextMonth = function (thisMonth) {
  return thisMonth == 12 ? 1 : thisMonth + 1
}

let today = function (source) {
  let dom = $('li:first-child', source)[0]

  return {
    temp: getTemp($('p.tem', dom).text())
  }
}

let forecast = function (source) {
  let doms = $('li', source)

  let thisMonth = (new Date()).getMonth()
  let thisDay = (new Date()).getDay()

  let result = {}
  ;[1, 2, 3, 4, 5].forEach(function (idx) {
    let dom = doms[idx]
    let tempDom = $('p.tem', dom)

    let day = getDay($('h1', dom).text())
    let month = day < thisDay ? nextMonth(thisMonth) : thisMonth

    let key = sprintf('%02d%02d', month, day)
    result[key] = {
      temp: {
        min: getTemp($('span', tempDom).text()),
        max: getTemp($('i', tempDom).text())
      }
    }
  })

  return result
}

export default function () {
  return domSource().then(function (dom) {
    return {
      today: today(dom),
      forecast: forecast(dom)
    }
  })
}
