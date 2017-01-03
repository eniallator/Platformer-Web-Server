var express = require('express');
var path = require("path");
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

app.get('/', function (req, res) {
  res.render("index.template", {
    name : "Niall",
    windowsDist: getDistUrl("windows"),
    macDist: getDistUrl("mac"),
   });
});

app.get('/maps', function (req, res) {
  res.send("foo")
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
