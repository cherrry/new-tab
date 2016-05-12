import { add as addTask } from 'serv/scheduler'

import updateWeather from 'serv/weather-updater'
import { updateCurrentLocation } from 'serv/task/location-task'

import { createServer as messageHandler } from 'api/helper'
import weatherServ from 'api/serv/weather-serv'

let minutes = 60 * 1000
let hours = 60 * minutes

addTask(0, 20 * minutes, 5 * minutes, updateWeather)
addTask(0, 1 * hours, 10 * minutes, updateCurrentLocation)

messageHandler()
  .addHandler(weatherServ)
  .run()
