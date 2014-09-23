function playSound() {
  var audio = document.getElementById('sound');
  audio.play();
};     

var app = angular.module('CliqueApp', ['ngRoute'])

  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/recipient-gift-card/:id', {
        controller: 'RecipientCtrl',
        templateUrl: '/public/partials/recipient.html'
      })
      .when('/redemption/:id', {
        controller: 'AuthenticationCtrl',
        templateUrl: '/public/partials/redemption.html',
      })
      .when('/unlock', {
        controller: 'UnlockCtrl'
      })
      // .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);

  })

  .controller('RecipientCtrl', function ($scope, api, $location){

    // pull cardId(uniqueLink) from URI
    var cardId = ($location.path().substr($location.path().lastIndexOf('/')).substr(1));

    // get card info
    api.getCards(cardId)
    .then(function(data){
      $scope.from = "- " + data.basicProfile.firstName;

      // loop through cliqueCards to find occassion message
      for(var i=0; i<data.cliqueCards.length;i++) {
        if(data.cliqueCards[i]) $scope.message = data.cliqueCards[i].occassion;
      }
    });

    $scope.change = function() {
      $location.path('/redemption/' + cardId);
    };

  })

  .controller('AuthenticationCtrl', function ($scope, $location, $http, api) {

    var cardId = ($location.path().substr($location.path().lastIndexOf('/')).substr(1));


    api.getBuyerNumber(cardId)
    .then(function(data){
      $scope.buyerName = data.bName;
      $scope.buyerNumber = data.bNumber;
      $scope.districtNumber = data.districtNumber;
    });

    // default classes
    $scope.lockPhase = 'locked';
    $scope.amountPhase = 'amountStart';
    $scope.tiltPhase = 'tiltStart';
    $scope.padPhase = 'padStart';
    $scope.arrowPhase = 'arrowStart';
    $scope.show = 'noShow';
    $scope.thankYouPhase = 'thankYouStart';
    $scope.shake = '';

    // classes once lock icon is ted
    $scope.change = function () {
      $scope.lockPhase = 'unlock';
      $scope.amountPhase = 'amountEnd';
      $scope.tiltPhase = 'tiltEnd'
      $scope.padPhase = 'padEnd';
      $scope.arrowPhase = 'arrowWht';
    };

    // merchant name
    $scope.merchantName = "DoLy's Delectables";

    // spend amount
    $scope.spend = '2';

    // icons
    $scope.icons = [
      'icon0',
      'icon1',
      'icon2',
      'icon3',
      'icon4',
      'icon5',
      'icon6',
      'icon7',
      'icon8',
    ];

    // for clickedCSS
    var counter = 0

    // change css if icon clicked
    $scope.clickedCSS = function (icon) {

      counter++;

      // if icon is aqua make white
      if ($scope.icons[icon] === 'icon' + icon) {
        $scope.shake = '';
        $scope.icons[icon] = 'iconWht' + icon;
      }
      // if icon is white make aqua
      else {
      $scope.icons[icon] = 'icon' + icon;
      }


      // if pie, wine and cupcake are clicked do the following
      if ( ($scope.icons[0].slice(4,7) === 'Wht') && ($scope.icons[3].slice(4,7) === 'Wht') && ($scope.icons[8].slice(4,7) === 'Wht') ) {

        $http.post('/card', {cardId: cardId});

        // make sure merchant info is out of view
        $scope.show = 'noShow';

        // move amount up and pad up/off view
        $scope.amountPhase = 'amountFinish';
        $scope.padPhase = 'padStart';
        $scope.arrowPhase = 'arrowCorrectCode';

        // move thank you for recipient up into view
        $scope.thankYouPhase = 'thankYouEnd';
      }
      // if wrong tricon code entered trigger shake animation and default css colors
      if ( (counter === 3) && ($scope.thankYouPhase != 'thankYouEnd') ) {
        for (var i=0; i<$scope.icons.length; i++) {
          $scope.icons[i] = $scope.icons[i].replace('Wht', '');
        }
        $scope.shake = 'shake';
        counter = 0;
      }  
    };

    // show merchant instruction when info icon clicked
    $scope.infoClick = function () {

      if ($scope.infoSelected === 'infoSelected') {
        $scope.infoSelected = '';
        $scope.show = 'noShow';
      }
      else {
        $scope.infoSelected = 'infoSelected';
        $scope.show = 'show';
      }

    };

    // route user back to Recipient view
    $scope.cancelClick = function () {
      $scope.cancelSelected = 'cancelSelected';
      $location.path('/recipient-gift-card/' + cardId);
    };

    $scope.sendRecipientMessage = function () {
      console.log($scope.recipient.message);
      console.log($scope.buyerNumber);
      var messageObject = {
        message: $scope.recipient.message,
        to: $scope.buyerNumber,
        from: $scope.districtNumber
      }
      api.sendThankYou(messageObject);
    };



  })

  .service('api', function($http, $q) {

    return {
      getCards: function(cardId){
        // url to be queried
        var url = '/api/cards/';
        if (cardId) {
          url += cardId;
        }
        // query url for data
        var promise = $http.get(url)
        .then(function(response){
          return response.data;
        });
        return promise;
      },
      getBuyerNumber: function(cardId){
        var deferred = $q.defer();
        // url to be queried
        var url = '/api/buyernumber/';
        if (cardId) {
          url += cardId;
        }
        // query url for data
        var promise = $http.get(url)
        .success(function(data){
          // find the district number originally messaged by Buyer and use as From number
          for (var i=0; i<data.cliqueCards.length; i++){
            if (data.cliqueCards[i].uniqueLink === cardId) {
              var districtNumber = data.cliqueCards[i].districtNumber;
            }
          }
          deferred.resolve({
            bName: data.basicProfile.firstName,
            bNumber: data.basicProfile.contact.mobileNumber,
            districtNumber: districtNumber
          });
        });
        return deferred.promise;
      },
      sendThankYou: function(message) {
        $http.post('/sendThankYou', message);
      }
    };

  });

