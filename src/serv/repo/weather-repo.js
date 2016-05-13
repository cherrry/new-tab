import lf from 'lovefield'
import { sprintf } from 'sprintf-js'

import { connection } from './db'

export function todayWeather(location) {
  return connection.then(function (db) {
    let weather = db.getSchema().table('Weather')
    return db.select()
      .from(weather)
      .where(weather.location.eq(location))
      .exec()
      .then(function (rows) {
        if (rows.length === 0) {
          throw new Error(sprintf("Weather data does not exist for %s.", location))
        }
        return rows[0]
      })
  })
}

export function setTodayWeather(location, today) {
  return connection.then(function (db) {
    let weather = db.getSchema().table('Weather')
    return db.insertOrReplace()
      .into(weather)
      .values([
        weather.createRow({
          location,
          icon: today.icon,
          temp: today.temp
        })
      ])
      .exec()
  })
}

export function fourDaysForecast(location) {
  let now = new Date()
  let dates = [1, 2, 3, 4].map(function (dayOffset) {
    let date = new Date(now.getTime() + dayOffset * 86400 * 1000)
    return parseInt(sprintf("%d%02d", date.getMonth() + 1, date.getDate()))
  })

  return connection.then(function (db) {
    let forecast = db.getSchema().table('Forecast')
    return db.select()
      .from(forecast)
      .where(lf.op.and(
        forecast.location.eq(location),
        forecast.date.in(dates)
      ))
      .orderBy(forecast.date, lf.Order.ASC)
      .exec()
      .then(function (rows) {
        if (rows.length !== 4) {
          throw new Error(sprintf("Forecast data is not complete for %s.", location))
        }
        return rows
      })
  })
}

export function setForecasts(location, forecasts) {
  return connection.then(function (db) {
    let forecast = db.getSchema().table('Forecast')
    return db.insertOrReplace()
      .into(forecast)
      .values(
        Object.keys(forecasts)
          .filter(date => forecasts.hasOwnProperty(date))
          .map(function (date) {
            let { icon, minTemp, maxTemp } = forecasts[date]
            return forecast.createRow({
              location,
              date: parseInt(date.replace(/^0+/, '')),
              icon,
              minTemp,
              maxTemp
            })
          })
      )
      .exec()
  })
}

export default {
  todayWeather,
  setTodayWeather,
  fourDaysForecast,
  setForecasts
}
