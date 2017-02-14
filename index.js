var express = require('express');
var path = require("path");
var fs = require("fs");
var engines = require("consolidate");
var config = require("./config");
var app = express();
var port = process.env.PORT || 3000;

function getDistUrl(distType) {
  return "https://github.com/eniallator/platformer/releases/download/"
    + config.platformerLabel
    + config.platformerVersion
    + `/platformer_${distType}_V${config.platformerVersion}.zip`;
}

if (process.env.npm_lifecycle_event === "dev") {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpackConfig = require("./webpack.config");
  var webpack = require("webpack");
  console.log("in dev")

  app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: "/build/"
  }));
}

app.set("view engine", "template");
app.set("views", path.join(__dirname, "views"));
app.engine("template", engines.hogan);

app.use("/build", express.static("build"));

app.get('/', (req, res) => {
  res.render("index.template", {
    windowsDist: getDistUrl("windows"),
    macDist: getDistUrl("mac"),
   });
});

app.get('/maps', (req, res) => {
  fs.readdir("./uploads", function (err, fileList) {
    res.send(fileList);
  });
});

app.get('/maps/:id', ({params: {id: reqId}}, res) => {
  res.setHeader("Content-Disposition", `attachment; filename=${reqId}`);
  res.setHeader("Content-Type", "application/force-download");

  console.log(`[Download] : ${reqId}`)

  res.download(path.join(__dirname, "uploads", reqId));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
