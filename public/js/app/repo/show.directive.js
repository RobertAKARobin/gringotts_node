"use strict";

(function (){
  angular
  .module("repos")
  .directive("repo", [
    DirectiveFunction
  ]);

  function DirectiveFunction(){
    return{
      templateUrl: "./js/app/repo/show.html",
      link: function(scope){
        scope.ctrl = scope.$parent.showVM;
        if(scope.repo.tags) scope.repo.tags.forEach(function(tag){
          if(!scope.ctrl.tags.includes(tag)) scope.ctrl.tags.push(tag);
        });
      }
    }
  }
}());
