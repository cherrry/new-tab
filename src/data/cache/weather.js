import connection from 'db/connection'

let update = function (location, ajax) {
  return Promise.all([connection, ajax()])
    .then(function (values) {
      let db = values[0]
      let { today, forecast } = values[1]

      let weatherTable = db.getSchema().table('Weather')
      let weatherUpdate = db.insertOrReplace()
        .into(weatherTable)
        .values([
          weatherTable.createRow({
            location,
            icon: today.icon,
            temp: today.temp
          })
        ])
        .exec()

      let forecastTable = db.getSchema().table('Forecast')
      let forecastUpdate = db.insertOrReplace()
        .into(forecastTable)
        .values(Object.keys(forecast).map(function (date) {
          let data = forecast[date]
          return forecastTable.createRow({
            location,
            date: parseInt(date.replace(/^0+/, '')),
            icon: data.icon,
            minTemp: data.minTemp,
            maxTemp: data.maxTemp
          })
        }))
        .exec()

      return Promise.all([weatherUpdate, forecastUpdate]).then(function (values) {
        return true
      })
    })
}

export default {
  update
}
