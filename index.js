var express = require('express');
var path = require("path");
var hogan = require("hogan.js");
var engines = require("consolidate");
var app = express();
var port = process.env.PORT || 3000;

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
    version : "1.0.1",
    type : "Alpha"
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
