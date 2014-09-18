function playSound() {
  var audio = document.getElementById('sound');
  audio.play();
};     

var app = angular.module('CliqueApp', ['ngRoute'])

  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .when('/recipient-gift-card/:id', {
        controller: 'RecipientCtrl',
        templateUrl: '/recipient-gift-card'
      })
      .when('/redemption/:id', {
        controller: 'AuthenticationCtrl',
        templateUrl: '/redemption',
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

  .controller('AuthenticationCtrl', function ($scope, $location, $http) {

    var cardId = ($location.path().substr($location.path().lastIndexOf('/')).substr(1));

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

    // buyer name
    $scope.buyerName = "Jerry";

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
        console.log('shake test');
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

  })

  .service('api', function($http) {

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
      }
    };

  });

