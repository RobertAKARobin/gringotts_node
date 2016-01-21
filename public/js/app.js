"use strict";

(function(){
  angular
  .module("gringotts", [
    "ui.router",
    "repos"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "./js/repo/main.html",
      controller: "mainController",
      controllerAs: "mainVM"
    })
    .state("index", {
      url: "/:org",
      templateUrl: "./js/repo/index.html",
      controller: "showController",
      controllerAs: "showVM",
      reloadOnSearch: false
    });
  }
}());
