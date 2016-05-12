import haversine from 'haversine'
import { allLocations } from 'serv/repo/location-repo'

function findClosest(coords, locations) {
  return locations.reduce(function (closest, location) {
    let { name } = location
    let distance = haversine(coords, location)
    return distance < closest.distance ? { name, distance } : closest
  }, { name: null, distance: Infinity }).name
}

function currentCoords() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let { latitude, longitude } = position.coords
      resolve({ latitude, longitude })
    })
  })
}

export function currentLocation() {
  return Promise.all([currentCoords(), allLocations()])
    .then(function (values) {
      let coords = values[0]
      let locations = values[1]
      return findClosest(coords, locations)
    })
}

export default {
  currentLocation
}
