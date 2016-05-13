import { setTodayWeather, setForecasts } from 'serv/repo/weather-repo'

let update = function (location, ajax) {
  return ajax().then(function ({ today, forecast }) {
    return Promise.all([
      setTodayWeather(location, today),
      setForecasts(location, forecast)
    ])
  })
}

export default {
  update
}
