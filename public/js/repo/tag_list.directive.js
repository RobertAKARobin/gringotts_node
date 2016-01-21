"use strict";

(function (){
  angular
  .module("repos")
  .directive("tagList", [
    DirectiveFunction
  ]);

  function DirectiveFunction(){
    return{
      templateUrl: "./js/repo/tag_list.html",
      scope: {
        tags: "=",
        showClear: "@"
      },
      link: function(scope){
        scope.ctrl = scope.$parent.showVM;
      }
    }
  }
}());
