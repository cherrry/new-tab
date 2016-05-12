import loadWeather from './../../serv/weather-loader'

export default {
  refresh(location) {
    return loadWeather(location)
  }
}
