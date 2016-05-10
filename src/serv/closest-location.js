import haversine from 'haversine'
import connection from 'db/connection'

let at = function (coords, locations) {
  return locations.reduce(function (closest, location) {
    let name = location.name
    let distance = haversine(coords, location)
    return distance < closest.distance ? { name, distance } : closest
  }, {
    name: null,
    distance: Infinity
  }).name

  return Object.keys(locationList).reduce(function (closest, location) {
    console.log(closest, location)
    let locationCoords = locationList[location]
    let distance = haversine(coords, locationCoords)
    return distance < closest.distance ? { location, distance } : closest
  }, {
    location: null,
    distance: Infinity
  }).location
}

let here = function () {
  let locations = connection.then(function (db) {
    let locationTable = db.getSchema().table('Location')
    return db.select()
      .from(locationTable)
      .exec()
  })

  let currentLocation = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let { latitude, longitude } = position.coords
      resolve({ latitude, longitude })
    })
  })

  return Promise.all([currentLocation, locations])
    .then(function (values) {
      return at(values[0], values[1])
    })
}

export default here
here.at = at
