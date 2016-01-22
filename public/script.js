"use strict";

var h = (function helpers(){
  return {
    forEach: forEach,
    jsonp: jsonp
  }
  function jsonp(url){
    console.log(url);
    if(jsonp.element) document.head.removeChild(jsonp.element);
    jsonp.element = document.createElement("SCRIPT");
    jsonp.element.src = url;
    document.head.appendChild(jsonp.element);
  }
  function forEach(list, doWhat){
    var i = 0, l = list.length;
    for(i = 0; i < l; i++){
      if(doWhat(list[i]) === "break") break;
    }
  }
}());

var app = (function gringotts(){
  var baseURL = "https://api.github.com/";
  return {
    repos: [],
    tags: [],
    rateLimit: 0,
    repeats: {},
    token: Cookies.get("gh_token"),
    loadRepos, loadRepos,
    getAPIresponse: getAPIresponse
  }

  function loadRepos(orgNameInput){
    var orgName = document.getElementById(orgNameInput).value;
    app.repos = [];
    h.jsonp(baseURL + "orgs/" + orgName + "/repos?" + [
      "per_page=100",
      "callback=app.getAPIresponse",
      "access_token=" + app.token
    ].join("&"));
  }

  function parseRepos(response){
    var shouldLoadNextPage = false;
    app.repos = app.repos.concat(response.data);
    h.forEach(response.meta.Link, function(link){
      if(link[1].rel === "next"){
        shouldLoadNextPage = true;
        h.jsonp(link[0]);
        return "break";
      }
    });
    if(!shouldLoadNextPage) console.dir(app.repos)
  }

  function getAPIresponse(response){
    app.rateLimit = response.meta["X-RateLimit-Remaining"];
    if(app.rateLimit < 1) console.log("No more requests allowed.");
    else parseRepos(response);
  }
}());

window.onload = function(){

  eachDirective("data-if", function(element, condition){
    if(!eval(condition)) element.parentNode.removeChild(element);
  });

  function eachDirective(attrName, callback){
    var elements = document.querySelectorAll("[" + attrName + "]");
    h.forEach(elements, function(element){
      callback(element, element.getAttribute(attrName));
    });
  }
}
