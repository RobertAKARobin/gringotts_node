var express = require("express");
var app = express();

var http = require("request");
var env = require("./env");

app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/:org.json", function(req, res){
  var org = req.params["org"];
  http.get(gh_repos_for(org), function(err, response){
    res.header("Content-Type", "application/json");
    res.send(response.body);
  });
});

app.listen(3000, function(){
  console.log("Listening on 3000.");
});

function gh_repos_for(org, pageNum){
  return {
    "url": "https://api.github.com/orgs/" + org + "/repos",
    "auth": {
      "user": env.gh_username,
      "pass": env.gh_access_token,
      "sendImmediately": true
    },
    "qs": {
      "per_page": 100,
      "page": (pageNum || 1)
    },
    "headers": {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36"
    }
  }
}
