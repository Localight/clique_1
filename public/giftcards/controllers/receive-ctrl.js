'use strict';

angular.module('mean.giftcards', [])
    .controller('receiveController', ['$scope', '$rootScope', '$http', '$location',
        function($scope, $rootScope, $http, $location) {
            // Register the login() function
            $scope.names = ['alex', 'zlatko', 'dw'];
        }
    ]);