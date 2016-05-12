import scheduler from './serv/scheduler'

import updateLocation from './serv/location-updater'
import updateWeather from './serv/weather-updater'

let minutes = 60 * 1000
let hours = 60 * minutes

scheduler.add(0, 20 * minutes, 5 * minutes, updateWeather)
scheduler.add(0, 2 * hours, 10 * minutes, updateLocation)

import { createServer } from 'api/helper'
import weatherServ from 'api/serv/weather-serv'

createServer()
  .addHandler(weatherServ)
  .run()
