import { setCurrentLocation } from 'serv/repo/location-repo'
import { currentLocation } from 'serv/serv/location-serv'

export function updateCurrentLocation() {
  return currentLocation().then(function (location) {
    setCurrentLocation(location)
    return true
  })
}

export default {
  updateCurrentLocation
}
