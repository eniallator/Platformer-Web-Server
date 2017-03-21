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

function runDbQuery (querySql, values = [], callback) {
  var pool = new pg.Pool(config)

  pool.connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err)
    }

    client.query(querySql, values, function (err, result) {
      // call `done()` to release the client back to the pool
      done()

      if (err) {
        console.error('error running query', err)
        callback(err)
      }

      callback(null, result.rows)
    })
  })

  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
    callback(err)
  })
}

module.exports = runDbQuery
