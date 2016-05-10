import closestLocation from './closest-location'

let update = function () {
  closestLocation().then(function (location) {
    localStorage.setItem('current_location', location)
    return true
  })
}

export default update
