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
    $http.get("/" + $stateParams.org + ".json").then(function(){
      var response = arguments[0].data;
      if(response.error){
        vm.state = "error";
        return vm.message = JSON.parse(response.error).message;
      }
      vm.repos = response;
      vm.state = "loaded";
    });
  }
}());
