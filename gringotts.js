var express = require("express");
var app = express();

var http = require("request");
var gh = require("./helpers/github");
var path = require("path");

app.use(express.static(__dirname + "/public"));

app.get("/:org.json", function(req, res){
  var org = req.params["org"];
  var repos = [];
  (function load_repos(page){
    http.get(gh.repos_for(org, page), function(err, response){
      var pages;
      if(response.statusCode != 200){
        return res.json({error: response.body});
      }else{
        pages = gh.page_from(response.headers.link);
      }
      repos = repos.concat(JSON.parse(response.body));
      if(pages["next"]){
        console.log("Loading page " + pages["next"] + " of " + pages["last"] + "...");
        load_repos(pages["next"]);
      }else res.json({
        meta: {
          "rate-limit-remaining": response.headers["x-ratelimit-remaining"]
        },
        data: repos.map(gh.condense_repo)
      });
    });
  }());
});

app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(3000, function(){
  console.log("Listening on 3000.");
});
