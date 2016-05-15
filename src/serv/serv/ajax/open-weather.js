import { sprintf } from 'sprintf-js'

import jsonSource from './json-source'

let BASE_URL = 'http://api.openweathermap.org/data/2.5'

function apiKey() {
  return localStorage.getItem('openweather_appid')
}

export function currentWeather(location) {
  return jsonSource(`${BASE_URL}/weather?q=${location}&appid=${apiKey()}`)
    .then(function (json) {
      return {
        icon: null,
        temp: Math.round(json.main.temp) - 273
      }
    })
}

export function weatherForecast(location) {
  return jsonSource(`${BASE_URL}/forecast?q=${location}&appid=${apiKey()}`)
    .then(function (json) {
      return json.list.reduce(function (result, data) {
        let date = new Date(data.dt * 1000)
        let key = sprintf("%02d%02d", date.getMonth() + 1, date.getDate())

        let minTemp = Math.round(data.main.temp_min) - 273
        let maxTemp = Math.round(data.main.temp_max) - 273

        if (result.hasOwnProperty(key)) {
          minTemp = Math.min(result[key].minTemp, minTemp)
          maxTemp = Math.max(result[key].maxTemp, maxTemp)
        }

        result[key] = {
          icon: null,
          minTemp,
          maxTemp
        }

        return result
      }, {})
    })
}

export default {
  currentWeather,
  weatherForecast
}
