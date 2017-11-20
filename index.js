const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const engines = require('consolidate')
const runDbQuery = require('./db/runDbQuery')

const app = express()
const port = process.env.PORT || 3000
const upload = multer({ dest: 'uploads/' })
const insertMapSql = fs.readFileSync('./db/sql/insertMap.sql').toString()

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackConfig = require('./webpack.config')
  const webpack = require('webpack')
  console.log('in dev')

  app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/build/'
  }))
}

app.set('view engine', 'template')
app.set('views', path.join(__dirname, 'views'))
app.engine('template', engines.hogan)

app.use('/build', express.static('build'))

app.get('/', (req, res) => {
  res.render('index.template', {
    downloadLink: 'https://eniallator.itch.io/platformer'
  })
})

app.get('/maps', (req, res) => {
  // TODO read from database
  fs.readdir('./data/default_maps', (err, fileList) => {
    if (err) {
      console.error(err)
    }

    res.send(fileList)
  })
})

app.post('/maps/upload', upload.single('uploadFile'), (req, res) => {
  const mapName = req.file.originalname.replace(/\.map$/, '')
  const filePath = path.join(__dirname, 'uploads', req.file.filename)
  const userID = 0

  // TODO validate exists/size/basic structure
  runDbQuery(insertMapSql, [mapName, fs.readFileSync(filePath), userID])
    .then(() => {
      res.status(200).send('Upload success')
    }).catch(err => {
      console.error('Error uploading ' + mapName, err)
      res.status(500).send('Error uploading')
    }).then(() => {
      fs.unlink(filePath)
    })
})

app.get('/maps/:id', ({params: {id: reqId}}, res) => {
  res.setHeader('Content-Disposition', `attachment filename=${reqId}`)
  res.setHeader('Content-Type', 'application/force-download')

  console.log(`[Download] : ${reqId}`)

  res.download(path.join(__dirname, 'data', 'default_maps', reqId))
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

// TODO Add error handling
