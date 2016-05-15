import { currentWeather, weatherForecast } from './open-weather'

function today() {
  return currentWeather('mountainview')
}

function forecast() {
  return weatherForecast('mountainview')
}

export function mountainviewWeatherAjax() {
  return Promise.all([today(), forecast()])
    .then(function (values) {
      return {
        today: values[0],
        forecast: values[1]
      }
    })
}

export default { mountainviewWeatherAjax }
