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
    .state("index", {
      url: "/",
      templateUrl: "./js/repo/main.html",
      controller: "mainController",
      controllerAs: "mainVM"
    })
    .state("show", {
      url: "/:org",
      templateUrl: "./js/repo/show.html",
      controller: "showController",
      controllerAs: "showVM"
    });
  }
}());
