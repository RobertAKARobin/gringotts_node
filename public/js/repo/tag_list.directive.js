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
      replace: true,
      scope: {
        tags: "="
      },
      link: function(scope){
        scope.ctrl = scope.$parent.showVM;
      }
    }
  }
}());
