import schema from './schema'

export let connection = schema.connect()
  .then(function (db) {
    let location = db.getSchema().table('Location')
    let locations = [
      { name: 'hongkong', latitude: 22.3964, longitude: 113.1095 },
      { name: 'beijing', latitude: 39.9042, longitude: 116.4074 }
    ]

    return db.insertOrReplace()
      .into(location)
      .values(locations.map(function (data) {
        return location.createRow(data)
      }))
      .exec()
      .then(function (rows) {
        return db
      })
  })

export default { connection }
