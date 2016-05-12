import { actionsStore } from './helper'

import weatherApi from 'api/app/weather-app'

let data = null

let as = actionsStore({
  getState() { return data },

  refresh() {
    return weatherApi.refresh()
      .then(function (newData) {
        data = newData
      })
  }
})

export let WeatherActions = as.actions
export let WeatherStore = as.store
