import connection from 'db/connection'

import hongKongWeather from './../data/ajax/hongkong-weather'
import beijingWeather from './../data/ajax/beijing-weather'
import weather from './../data/cache/weather'

let ajaxUpdater = {
  'hongkong': hongKongWeather,
  'beijing': beijingWeather
}

let locations = function () {
  return connection.then(function (db) {
    return db.select()
      .from(db.getSchema().table('Location'))
      .exec()
      .then(function (locations) {
        return locations.map(function (location) {
          return location.name
        })
      })
  })
}

let run = function () {
  return locations()
    .then(function (locations) {
      return locations
        .filter(function (location) {
          return ajaxUpdater.hasOwnProperty(location)
        })
        .map(function (location) {
          return weather.update(location, ajaxUpdater[location])
        })
    })
    .then(function (promises) {
      return Promise.all(promises)
    })
}

export default run
