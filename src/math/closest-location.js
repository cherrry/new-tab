import haversine from 'haversine'

let locationList = {
  'hongkong': {
    latitude: 22.3964,
    longitude: 114.1095
  },
  'beijing': {
    latitude: 39.9042,
    longitude: 116.4074
  }
}

let at = function (coords) {
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
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let { latitude, longitude } = position.coords
      resolve(at({ latitude, longitude }))
    })
  })
}

export default here
