var express = require("express");
var app = express();

var request = require("request");
var path = require("path");
var env = require("./env.json");

var gh = require("./helpers/github.js");

var cookies = require("cookie-parser");
var cookieDefault = {
  signed: false,
  expires: new Date("Jan 1 2100")
}

app.use(express.static(__dirname + "/public"));
app.use(cookies(env.secret));
app.set("port", process.env.PORT || 3000);

app.get("/*", function(req, res){
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.listen(app.get("port"), function(){
  console.log("It's aliiiive on " + app.get("port") + "!");
});
