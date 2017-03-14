var fs = require('fs')
var runDbQuery = require('./runDbQuery')

const initSql = fs.readFileSync('./db/sql/init.sql').toString()

runDbQuery(initSql, null, err => { console.log(err) })
