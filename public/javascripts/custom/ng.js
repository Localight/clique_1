var app = angular.module('surfAirApp', [])

.controller('email', function($scope, $location, api) {

  var userId = $location.path()

})

.service('api', function($http) {

  return {
    getUserInfo: function(userId) {
      var url = '/api/user/';
      if (userId){
        url += userId;
      }
      // query url for data
      var promise = $http.get(url)
      .then(function(response){
        return response.data;
      });
      return promise;
    }
  }

})