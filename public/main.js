require("./css/main.css")
var $ = require("jquery")

fetch("/maps").then(data => {
  data.json().then(mapArray => {
    mapArray.forEach(mapName => {

      const link = $(`<a href="/maps/${mapName}">${mapName.replace(/\.map$/, "")}</a><br>`);

      $("#mapList").append(link);
    })
  })
});

/*
Todo file upload using this:

$(".js-file-input").on("change", uploadFile);
*/

$(".js-file-upload").on("click", function(event) {
	event.preventDefault()
	$(".js-file-input").click();
});
