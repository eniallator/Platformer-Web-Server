require('./css/main.css')
var $ = require('jquery')

fetch('/maps').then(data => {
  data.json().then(mapArray => {
    mapArray.forEach(mapName => {
      const link = $(`<a href='/maps/${mapName}'>${mapName.replace(/\.map$/, '')}</a><br>`)

      $('#mapList').append(link)
    })
  })
})

// Todo file upload using this:

$('.js-file-input').on('change', (event) => {
  var files = event.target.files
  var formData = new FormData()

  formData.append('uploadFile', files[0])

  fetch('/maps/upload', {
    method: 'POST',
    body: formData
  })
})

$('.js-file-upload').on('click', (event) => {
  event.preventDefault()
  $('.js-file-input').click()
})
