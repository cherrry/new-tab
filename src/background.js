console.log('hello world')

import connection from './data/db/connection'

connection.then(function (db) {
  return db
})
