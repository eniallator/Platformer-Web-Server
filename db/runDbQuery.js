const pg = require('pg')
let conf

if (process.env.NODE_ENV !== 'production') {
  conf = require('../devConfig')
} else {
  conf = require('../prodConfig')
}

const dbConf = {
  user: conf.dbUser,
  database: conf.dbName,
  password: conf.dbPassword,
  host: conf.dbHost,
  port: conf.dbPort,
  ssl: conf.ssl,
  max: 10,
  idleTimeoutMillis: 30000
}

function runDbQuery (querySql, values = []) {
  var pool = new pg.Pool(dbConf)
  return new Promise((resolve, reject) => {
    console.log('in runDbQuery', querySql, values)
    pool.connect((err, client, done) => {
      if (err) {
        return reject(err)
      }

      client.query(querySql, values, (err, result) => {
        // call `done()` to release the client back to the pool
        done()

        if (err) {
          console.error('error running query', err)
          return reject(err)
        }

        resolve(result.rows)
      })
    })

    pool.on('error', (err, client) => {
      console.error('idle client error', err.message, err.stack)
      reject(err)
    })
  })
}

module.exports = runDbQuery
