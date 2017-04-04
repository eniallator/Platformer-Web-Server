var fs = require('fs')
var runDbQuery = require('./runDbQuery')

const initTablesSql = fs.readFileSync('./db/sql/initTables.sql').toString()
const insertGameMapSql = fs.readFileSync('./db/sql/insertGameMap.sql').toString()

// Before this delete all -1(AKA default, system, blah blah blah) created maps

runDbQuery(initTablesSql)
  .then(() => runDbQuery(insertGameMapSql, ['Level 1', fs.readFileSync('./uploads/Level 1.map'), -1]))
  .then(() => runDbQuery(insertGameMapSql, ['Level 2', fs.readFileSync('./uploads/Level 2.map'), -1]))
  .then(() => {
    console.info('Database initialised')
  }).catch(err => {
    console.error('Error initialising database', err)
  }).then(process.exit)
