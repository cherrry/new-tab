import { allLocations } from 'serv/serv/location-serv'
import { ajaxWeatherData } from 'serv/serv/weather-serv'

import { setWeatherData } from 'serv/repo/weather-repo'

function locations() {
  return allLocations().then(function (locations) {
    return locations.map(function (location) {
      return location.name
    })
  })
}

export function updateWeatherData() {
  return locations()
    .then(function (locations) {
      locations.map(function (location) {
        return ajaxWeatherData(location)
          .then(function (weatherData) {
            return setWeatherData(location, weatherData)
          })
      })
    })
    .then(function (promises) {
      return Promise.all(promises)
    })
}

export default { updateWeatherData }
