var fs = require('fs')
var runDbQuery = require('./runDbQuery')

const initTablesSql = fs.readFileSync('./db/sql/initTables.sql').toString()
const insertGameMapSql = fs.readFileSync('./db/sql/insertGameMap.sql').toString()

// Convert runDbQuery to use promises for fun and profit and money is good

runDbQuery(initTablesSql, null, (err) => {
  if (err) {
    console.log('Error initialising tables', err)
  }

  // Before this delete all -1(AKA default, system, blah blah blah) created maps
  runDbQuery(insertGameMapSql, ['Level 1', fs.readFileSync('./uploads/Level 1.map'), -1], (err) => {
    if (err) {
      console.log('Error initialising data', err)
    }

    runDbQuery(insertGameMapSql, ['Level 2', fs.readFileSync('./uploads/Level 2.map'), -1], (err) => {
      if (err) {
        console.log('Error initialising data', err)
      }

      console.info('Database initialised')

      process.exit()
    })
  })
})
