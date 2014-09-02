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

  // change css if icon clicked
  $scope.clickedCSS = function (icon) {

    // if icon is white make aqua
    if ($scope.icons[icon].substr(-8) === '-wht.png') {
      $scope.icons[icon] = $scope.icons[icon].replace('-wht', '');
    }
    // if icon is aqua make white
    else {
    var image = $scope.icons[icon];
    $scope.icons[icon] = image.substr(0, image.length-4) + '-wht' + image.substr(-4);
    }

    // if pie, wine and cupcake are clicked do the following
    if ( ($scope.icons[0].substr(-8) === '-wht.png') && ($scope.icons[3].substr(-8) === '-wht.png') && ($scope.icons[8].substr(-8) === '-wht.png') ) {
      
      // make sure merchant info is out of view
      $scope.show = 'noShow';

      // move amount up and pad up/off view
      $scope.amountPhase = 'amountFinish';
      $scope.padPhase = 'padStart';

      // move thank you for recipient up into view
      $scope.thankYouPhase = 'thankYouEnd';
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





