"use strict";

(function (){
  angular
  .module("repos")
  .controller("showController", [
    "$http",
    "$stateParams",
    "$location",
    ControllerFunction
  ]);

  function ControllerFunction($http, $stateParams, $location){
    var vm = this;
    vm.state = "loading";
    vm.org = $stateParams.org;
    vm.repos = [];
    vm.url = "https://github.com/" + vm.org;
    vm.filter = $location.$$search.tag;
    vm.tags = [];
    vm.filterer = function(repo){
      var filter = $location.$$search.tag;
      if(!filter || !vm.tags.includes(filter)) return true;
      else return (repo.tags && repo.tags.indexOf(filter) > -1);
    }
    vm.filter_on = function(tag){
      $location.search("tag", tag);
    }
    $http.get("/" + vm.org + ".json").then(function(){
      var response = arguments[0].data;
      console.log(response.meta)
      if(response.error) return vm.state = "error";
      vm.repos = response.data;
      vm.state = "loaded";
    });
  }
}());
