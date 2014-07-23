var app = angular.module('CliqueApp', []);

  app.controller('RecipientCtrl', function ($scope, api){

    api.getCards().then(function(data){
      $scope.message = data.occassion;
      console.log(data);
      $scope.from = "- " + data.giftBuyer;
    });

  // $scope.message = "Congratulations on the birth of your child!"
  // $scope.from = "- DW"
    // $scope.from = "-Greg";
    // console.log(api.getCards);
    // api.getCards()
    // .then(function(data){
    //   console.log(data)
    // });

  });

  app.service('api', function($http) {

    var users = ['george', 'jorge', 'greg'];

    return {
      getCards: function(){
        // url to be queried
        var url = '/api/cards';
        // query url for data
        var promise = $http.get(url)
        .then(function(response){
          return response.data;
        });
        return promise;
      }
    };

  });
  // .service('api')
  // .service('api', function($http){
    // var api = {
    //   getCards: function(){
    //     // url to be queried
    //     var url = '/api/cards';
    //     // query url for data
    //     var promise = $http.get(url)
    //     .then(function(response){
    //       return response.data;
    //     });
    //     return promise;
    //   }

  //   }

  // });

  // function RecipientCtrl($scope) {
  //   $scope.message = "Hey there";
  //   $scope.from = "Greg"

  //   api.getCards()
  //   .then(function(data){
  //     console.log(data)
  //   });

  // }

  // function RecipientService($http) {
    


  // }
