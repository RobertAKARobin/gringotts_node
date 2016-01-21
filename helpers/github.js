var env = require("../env.json");

module.exports = (function(){
  var gh = {};
  gh.login = function(res){
    var path = "https://github.com/login/oauth/authorize?";
    res.redirect(301, path + [
      "client_id=" + env.gh.id,
      "redirect_url=" + env.gh.redirect
    ].join("&"));
  }
  return gh;
}());
