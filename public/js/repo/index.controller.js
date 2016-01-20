"use strict";

(function (){
  angular
  .module("repos")
  .controller("showController", [
    "$http",
    "$stateParams",
    ControllerFunction
  ]);

  function ControllerFunction($http, $stateParams){
    var vm = this;
    vm.state = "loading";
    vm.org = $stateParams.org;
    vm.repos = [];
    vm.url = "https://github.com/" + vm.org;
    $http.get("/" + vm.org + ".json").then(function(){
      var response = arguments[0].data;
      if(response.error) return vm.state = "error";
      vm.repos = response.data;
      vm.state = "loaded";
    });
  }
}());
