const fs = require('fs')
const runDbQuery = require('./runDbQuery')

const readSync = fs.readFileSync.bind(fs)

const initTablesSql = readSync('./db/sql/initTables.sql').toString()
const deleteDefaultMapsSql = readSync('./db/sql/deleteDefaultMaps.sql').toString()
const insertDefaultMapsSql = readSync('./db/sql/insertDefaultMaps.sql').toString()

runDbQuery(initTablesSql)
  .then(() => runDbQuery(deleteDefaultMapsSql))
  .then(() => runDbQuery(insertDefaultMapsSql, ['Level 1', readSync('./data/default_maps/Level 1.map'), -1]))
  .then(() => runDbQuery(insertDefaultMapsSql, ['Level 2', readSync('./data/default_maps/Level 2.map'), -1]))
  .then(() => {
    console.info('Database initialised')
  }).catch(err => {
    console.error('Error initialising database', err)
  }).then(process.exit)
