"use strict";

(function (){
  angular
  .module("repos")
  .directive("repo", [
    DirectiveFunction,
  ]);

  function DirectiveFunction(){
    return{
      templateUrl: "./js/repo/show.html",
      link: function(scope){
        // console.dir(scope)
      }
    }
  }
}());
