import { actionsStore } from './helper'

import weatherApi from 'api/app/weather-app'

let location = localStorage.getItem('current_location')
let weather = null

let as = actionsStore({
  getState() {
    return { location, weather }
  },

  refresh() {
    return weatherApi.refresh(location)
      .then(function (newWeather) {
        weather = newWeather
      })
  }
})

export let WeatherActions = as.actions
export let WeatherStore = as.store
