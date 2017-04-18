const fs = require('fs')
const runDbQuery = require('./runDbQuery')

function readSync (sqlFile) {
  return fs.readFileSync(sqlFile).toString()
}

const initTablesSql = readSync('./db/sql/initTables.sql')
const deleteDefaultMapsSql = readSync('./db/sql/deleteDefaultMaps.sql')
const insertMapSql = readSync('./db/sql/insertMap.sql')

runDbQuery(initTablesSql)
  .then(() => runDbQuery(deleteDefaultMapsSql))
  .then(() => runDbQuery(insertMapSql, ['Level 1', readSync('./data/default_maps/Level 1.map'), -1]))
  .then(() => runDbQuery(insertMapSql, ['Level 2', readSync('./data/default_maps/Level 2.map'), -1]))
  .then(() => {
    console.info('Database initialised')
  }).catch(err => {
    console.error('Error initialising database', err)
  }).then(process.exit)
