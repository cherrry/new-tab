import { weatherData } from 'serv/serv/weather-serv'

export default {
  refresh(location) {
    return weatherData(location)
  }
}
