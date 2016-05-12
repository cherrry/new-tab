import { connection } from './db'

let CURRENT_LOCATION = 'current_location'

export function allLocations() {
  return connection.then(function (db) {
    let location = db.getSchema().table('Location')
    return db.select().from(location).exec()
  })
}

export function currentLocation() {
  return localStorage.getItem(CURRENT_LOCATION)
}

export function setCurrentLocation(location) {
  localStorage.setItem(CURRENT_LOCATION, location)
}

export default {
  allLocations,
  currentLocation,
  setCurrentLocation
}
