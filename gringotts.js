var express = require("express");
var app = express();

var http = require("request");
var gh = require("./helpers/github");

app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/:org.json", function(req, res){
  var org = req.params["org"];
  var repos = [];
  (function load_repos(page){
    http.get(gh.repos_for(org, page), function(err, response){
      var pages = gh.page_from(response.headers.link);
      repos = repos.concat(JSON.parse(response.body));
      if(pages["next"]){
        console.log("Loading page " + pages["next"] + " of " + pages["last"] + "...");
        load_repos(pages["next"]);
      }else res.json(repos.map(gh.condense_repo));
    });
  }());
});

app.listen(3000, function(){
  console.log("Listening on 3000.");
});
