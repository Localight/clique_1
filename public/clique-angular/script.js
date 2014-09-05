var app = angular.module('CliqueApp', ['ngRoute']);

  app.controller('RecipientCtrl', function ($scope, api, $routeParams, $location){

    var cardId = ($location.path().substr($location.path().lastIndexOf('/')).substr(1));

    // get card info
    api.getCards(cardId)
    .then(function(data){
      console.log(data);
      $scope.message = data.occassion;
      $scope.from = "- " + data.giftBuyer;
    });

    $scope.change = function() {
      $location.path('/redemption');
    };

  });

  app.service('api', function($http) {

    return {
      getCards: function(id){
        // url to be queried
        var url = '/api/cards/785fdf0a-ff7e-4a4a-a199-7a9a2b3cb319';
        // if (id) {
        //   url += id;
        // }
        // query url for data
        var promise = $http.get(url)
        .then(function(response){
          return response.data;
        });
        return promise;
      }
    };

  });

