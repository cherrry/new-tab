import { sprintf } from 'sprintf-js'

import { todayWeather, fourDaysForecast } from 'serv/repo/weather-repo'

import { hongkongWeatherAjax } from './ajax/hongkong-weather'
import { beijingWeatherAjax } from './ajax/beijing-weather'

export function weatherData(location) {
  return Promise.all([
    todayWeather(location),
    fourDaysForecast(location)
  ])
    .then(function (values) {
      return {
        today: values[0],
        forecast: values[1]
      }
    })
}

let ajaxWeather = {
  hongkong: hongkongWeatherAjax,
  beijing: beijingWeatherAjax
}

export function ajaxWeatherData(location) {
  if (!ajaxWeather.hasOwnProperty(location)) {
    return Promise.reject(new Error(sprintf("Ajax updater does not exist for %s.", location)))
  }

  return ajaxWeather[location]()
}

export default {
  weatherData,
  ajaxWeatherData
}
