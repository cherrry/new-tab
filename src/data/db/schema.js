import lf from 'lovefield'

let schema = lf.schema.create('NewTab', 1)

schema.createTable('Location')
  .addColumn('name', lf.Type.STRING)
  .addColumn('latitude', lf.Type.NUMBER)
  .addColumn('longitude', lf.Type.NUMBER)
  .addPrimaryKey(['name'])

schema.createTable('Weather')
  .addColumn('location', lf.Type.STRING)
  .addColumn('temp', lf.Type.INTEGER)
  .addColumn('icon', lf.Type.STRING)
  .addUnique('u_location', ['location'])
  .addForeignKey('fk_location', {
    local: 'location',
    ref: 'Location.name',
    action: lf.ConstraintAction.CASCADE
  })

schema.createTable('Forecast')
  .addColumn('location', lf.Type.STRING)
  .addColumn('date', lf.Type.INTEGER)
  .addColumn('minTemp', lf.Type.INTEGER)
  .addColumn('maxTemp', lf.Type.INTEGER)
  .addColumn('icon', lf.Type.STRING)
  .addNullable(['icon'])
  .addUnique('u_location_date', ['location', 'date'])
  .addForeignKey('fk_location', {
    local: 'location',
    ref: 'Location.name',
    action: lf.ConstraintAction.CASCADE
  })

export default schema
