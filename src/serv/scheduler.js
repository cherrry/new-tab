let add = function (initialDelay, interval, failureDelay, callback) {
  let timeout

  let job = function () {
    Promise.resolve(callback()).then(function () {
      timeout = setTimeout(job, interval)
    }, function () {
      timeout = setTimeout(job, failureDelay)
    })
  }

  timeout = setTimeout(job, initialDelay)

  return {
    remove() {
      clearTimeout(timeout)
    }
  }

}

export default { add }
