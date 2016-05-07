export default function (url) {
  return fetch(url)
    .then(function (response) {
      return response.blob()
    })
    .then(function (blob) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()

        reader.onload = function () {
          resolve(reader.result)
        }

        reader.onerror = function () {
          reject(reader.error)
        }

        reader.readAsText(blob)
      })
    })
}
