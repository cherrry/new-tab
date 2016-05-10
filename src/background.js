import scheduler from './serv/scheduler'
import updateWeather from './serv/weather-updater'

let minutes = 60 * 1000

scheduler.add(0, 20 * minutes, 5 * minutes, updateWeather)
