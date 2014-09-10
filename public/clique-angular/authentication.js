angular.module('myApp', [])

.controller('myCtrl', function ($scope) {

  // default classes
  $scope.lockPhase = 'locked';
  $scope.amountPhase = 'amountStart';
  $scope.tiltPhase = 'tiltStart';
  $scope.padPhase = 'padStart';
  $scope.arrowPhase = 'arrowStart';
  $scope.show = 'noShow';
  $scope.thankYouPhase = 'thankYouStart';
  $scope.shake = true;

  // classes once lock icon is tapped
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
  $scope.spend = '520';

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

    // if icon is white make aqua
    if ($scope.icons[icon] === 'icon' + icon) {
      $scope.icons[icon] = 'iconWht' + icon;
    }
    // if icon is aqua make white
    else {
    $scope.icons[icon] = 'icon' + icon;
    }


    // if pie, wine and cupcake are clicked do the following
    if ( ($scope.icons[0].slice(4,7) === 'Wht') && ($scope.icons[3].slice(4,7) === 'Wht') && ($scope.icons[8].slice(4,7) === 'Wht') ) {

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
      $scope.shake = true;
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
  };

});





