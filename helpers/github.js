module.exports = (function(){
  var gh = {};
  var env = require("../env");
  gh.repos_for = function(org, pageNum){
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
  gh.page_from = function(header){
    var regexp = /(\&page=)([0-9])(>; rel=\")([a-z]+)/ig;
    var out = {};
    if(header) header.replace(regexp, function(){
      out[arguments[4]] = arguments[2];
    });
    return out;
  }
  gh.parse_description = function(description){
    var tagMatcher = /\[[^\]]*\]/ig, description = (description || "");
    var tags = description.match(tagMatcher);
    var english = description.replace(tagMatcher, "").trim();
    if(tags) tags = tags[0].toLowerCase().replace(/[\[\]]/g, "").split(/,[ ]*/);
    return { tags: tags, english: english }
  }
  gh.condense_repo = function(repo){
    var description = gh.parse_description(repo.description);
    return {
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: description.english,
      tags: description.tags,
      stars: repo.stargazers_count,
      watchers: repo.watchers_count
    }
  }
  return gh;
}());
