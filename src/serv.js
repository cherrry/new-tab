import { add as addTask } from 'serv/scheduler'

import { updateCurrentLocation } from 'serv/task/location-task'
import { updateWeatherData } from 'serv/task/weather-task'

import { createServer as messageHandler } from 'api/helper'
import weatherServ from 'api/serv/weather-serv'

let minutes = 60 * 1000
let hours = 60 * minutes

addTask(0, 1 * hours, 10 * minutes, updateCurrentLocation)
addTask(0, 20 * hours, 5 * minutes, updateWeatherData)

messageHandler()
  .addHandler(weatherServ)
  .run()
