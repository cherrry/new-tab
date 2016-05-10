import lf from 'lovefield'
import { sprintf } from 'sprintf-js'

import connection from 'db/connection'

let day = 86400 * 1000

let load = function (location) {
  let today = connection.then(function (db) {
    let weatherTable = db.getSchema().table('Weather')
    return db.select()
      .from(weatherTable)
      .where(weatherTable.location.eq(location))
      .exec()
      .then(function (rows) {
        let { icon, temp } = rows[0]
        return { icon, temp }
      })
  })

  let forecast = connection.then(function (db) {
    let dt = new Date()
    let now = dt.getTime()

    let dates = [1, 2, 3, 4].map(function (dayOffset) {
      let date = new Date(now + dayOffset * day)
      return parseInt(sprintf("%d%02d", date.getMonth() + 1, date.getDate()))
    })

    let forecastTable = db.getSchema().table('Forecast')
    return db.select()
      .from(forecastTable)
      .where(lf.op.and(
        forecastTable.location.eq(location),
        forecastTable.date.in(dates)
      ))
      .exec()
      .then(function (rows) {
        let result = {}
        rows.forEach(function (row) {
          let { date, icon, minTemp, maxTemp } = row
          let key = sprintf("%04d", date)
          result[key] = { icon, minTemp, maxTemp }
        })
        return result
      })
  })

  return Promise.all([today, forecast])
    .then(function (values) {
      return {
        today: values[0],
        forecast: values[1]
      }
    })
}

export default load
