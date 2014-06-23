'use strict';

angular.module('mean.giftcards', [])
    .controller('giveController', ['$scope', '$state',
        function($scope, $state) {
            // This object will be filled by the form
            $scope.stuff = ['harley', 'triumph', 'bultaco'];
        }
    ]);