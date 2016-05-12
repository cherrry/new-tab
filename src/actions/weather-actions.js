import { actionsStore } from './helper'

let location = localStorage.getItem('current_location')

let as = actionsStore({
  getState() {
    return {
      location
    }
  },

  refresh() {}
})

export let WeatherActions = as.actions
export let WeatherStore = as.store
