import { todayWeather, fourDaysForecast } from 'serv/repo/weather-repo'

export function weatherData(location) {
  return Promise.all([todayWeather(location), fourDaysForecast(location)])
    .then(function (values) {
      return {
        today: values[0],
        forecast: values[1]
      }
    })
}

export default {
  weatherData
}
