let update = function () {
  closestLocation().then(function (location) {
    localStorage.setItem('current_location', location)
    return true
  })
}

export default { update }
