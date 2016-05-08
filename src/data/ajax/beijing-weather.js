import $ from 'cheerio'
import { sprintf } from 'sprintf-js'

import htmlSource from './html-source'

let domSource = function () {
  return htmlSource('http://www.weather.com.cn/weather/101010100.shtml')
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
  let doms = $('li', source).toArray()

  let thisMonth = (new Date()).getMonth() + 1 // what?
  let thisDay = (new Date()).getDay()

  let result = {}
  doms.slice(1).forEach(function (dom) {
    let tempDom = $('p.tem', dom)

    let day = getDay($('h1', dom).text())
    let month = day < thisDay ? nextMonth(thisMonth) : thisMonth

    let key = sprintf("%02d%02d", month, day)
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
