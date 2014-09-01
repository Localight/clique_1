var app = angular.module('CliqueApp', ['ngRoute', 'ngAnimate', 'ui.router']);

  // app.config(function ($stateProvider, $urlRouterProvider) {

  //   $stateProvider

  //     .state('')

  // })

  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/recipient-gift-card/:id', {
        controller: 'RecipientCtrl'
      })
      .when('/redemption', {
        templateUrl: '/redemption'
      })
      .when('/unlock', {
        controller: 'UnlockCtrl'
      })
      // .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  });

  app.controller('RecipientCtrl', function ($scope, api, $routeParams, $location){

    var cardId = ($location.path().substr($location.path().lastIndexOf('/')).substr(1));
    // var cardId = //angular param

    api.getCards(cardId)
    .then(function(data){
      $scope.message = data.occassion;
      console.log(data);
      $scope.from = "- " + data.giftBuyer;
    });

    $scope.change = function() {
      $location.path('/redemption');
    };

  });

  app.controller('UnlockCtrl', function ($scope, $location){
    $scope.lock = 'true';

    $scope.unlock = function (){
      $scope.lock = 'false';
      console.log('hope');
      // $location.path('/redemption');
    }

  });

  app.service('api', function($http) {

    return {
      getCards: function(id){
        // url to be queried
        var url = '/api/cards/';
        if (id) {
          url += id;
        }
        // query url for data
        var promise = $http.get(url)
        .then(function(response){
          return response.data;
        });
        return promise;
      }
    };

  });

