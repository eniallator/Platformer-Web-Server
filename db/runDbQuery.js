var pg = require('pg')

var config = {
  user: 'postgres',
  database: 'platformer-web-server',
  password: 'eniallator',
  host: '127.0.0.1',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}

function runDbQuery (querySql, values = []) {
  var pool = new pg.Pool(config)
  return new Promise((resolve, reject) => {
    console.log('in runDbQuery', querySql, values)
    pool.connect((err, client, done) => {
      if (err) {
        return reject(err)
      }

      // console.log(querySql, values)

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
