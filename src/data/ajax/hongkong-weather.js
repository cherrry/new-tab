import $ from 'cheerio'
import { sprintf } from 'sprintf-js'

import htmlSource from './html-source'

let today = function () {
  let reTemp = /Air\s+Temperature\s*:\s*(-?\d+)/i
  let reIcon = /Weather\s+Cartoon\s*:\s+No\.\s+(\d+)/i

  return htmlSource('http://www.hko.gov.hk/textonly/v2/forecast/englishwx2.htm')
    .then(function (html) {
      return $('pre', html).text()
    })
    .then(function (text) {
      let tempText = text.match(reTemp)[1]
      let iconText = text.match(reIcon)[1]

      return {
        icon: iconText,
        temp: parseInt(tempText),
      }
    })
}

let forecast = function () {
  let reTemp = /Date\/Month\s*(\d+)\/(\d+)[\s\S]*?Temp\s+Range\s*:\s*(-?\d+)\s*-\s*(-?\d+)/gi
  let reIcon = function (idx) {
    return new RegExp(`Day\\s+${idx+1}\\s+cartoon\\s+no\\.\\s+(\\d+)`)
  }

  return htmlSource('http://www.hko.gov.hk/textonly/v2/forecast/nday.htm')
    .then(function (html) {
      return $('pre', html).text()
    })
    .then(function (text) {
      let result = {}

      text.match(reTemp).forEach(function (source, idx) {
        let iconText = text.match(reIcon(idx))[1]

        source.replace(reTemp, function (_0, day, month, tempMin, tempMax) {
          let key = sprintf("%02d%02d", parseInt(month), parseInt(day))
          result[key] = {
            icon: iconText,
            minTemp: parseInt(tempMin),
            maxTemp: parseInt(tempMax)
          }
        })
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
