import $ from 'cheerio'
import { sprintf } from 'sprintf-js'

import htmlSource from './html-source'

let regionCode = 101010200 // Haidian Region

let today = function () {
  let reTemp = /(-?\d+)/

  return htmlSource(`http://bj.weather.com.cn/`)
    .then(function (html) {
      return $('.weatherColumns', html)
    })
    .then(function (domSource) {
      let tempDom = $('dd > span', domSource).filter(function (_0, dom) {
        return $(dom).text().indexOf("℃") !== -1
      })

      return {
        icon: null,
        temp: parseInt(tempDom.text().match(reTemp)[1])
      }
    })
}

let forecast = function () {
  let reTemp = /^\s*(-?\d+)/
  let reDay = /\s*(\d+)/

  let thisDate = new Date()
  let thisMonth = thisDate.getMonth()
  let thisDay = thisDate.getDay()

  return htmlSource(`http://www.weather.com.cn/weather/${regionCode}.shtml`)
    .then(function (html) {
      return $('.c7d > ul', html)
    })
    .then(function (domSource) {
      let result = {}

      $('li', domSource).toArray().forEach(function (dom) {
        let tempDom = $('p.tem', dom)

        let day = parseInt($('h1', dom).text().replace(reDay, '$1'))
        let month = day < thisDay ? (thisMonth + 1) % 12 : thisMonth

        let key = sprintf("%02d%02d", month + 1 /* what ? */, day)
        result[key] = {
          icon: null,
          minTemp: parseInt($('i', tempDom).text().replace(reTemp, '$1')),
          maxTemp: parseInt($('span', tempDom).text().replace(reTemp, '$1'))
        }
      })

      return result
    })
}

export default function () {
  return Promise.all([
    today(),
    forecast()
  ]).then(function (values) {
    return {
      today: values[0],
      forecast: values[1]
    }
  })
}
