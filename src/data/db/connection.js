import schema from './schema'

export default schema.connect()
  .then(function (db) {
    let locationTable = db.getSchema().table('Location')

    let locationFixtures = [
      locationTable.createRow({
        name: 'hongkong',
        latitude: 22.3964,
        longitude: 113.1095
      }),
      locationTable.createRow({
        name: 'beijing',
        latitude: 39.9042,
        longitude: 116.4074
      })
    ]

    return db.insertOrReplace()
      .into(locationTable)
      .values(locationFixtures)
      .exec()
      .then(function (rows) {
        return db
      })
  })
