angular.module('CliqueApp', [])
  .controller('RecipientCtrl', function ($scope, $http, api){
    $scope.message = "Hey there";
    $scope.from = "Greg";
    console.log(api.getCards);
    api.getCards()
    .then(function(data){
      console.log(data)
    });

  })
  .service('api', function($http){
    var api = {
      getCards:'dog'
      // getCards: function(){
      //   // url to be queried
      //   var url = '/api/cards';
      //   // query url for data
      //   var promise = $http.get(url)
      //   .then(function(response){
      //     return response.data;
      //   });
      //   return promise;
      // }

    }

  });

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
