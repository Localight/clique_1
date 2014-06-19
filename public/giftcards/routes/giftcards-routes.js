'use strict';

//Setting up route
angular.module('mean.giftcards').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('giftcards.give', {
                url: '/give',
                templateUrl: 'public/giftcards/views/give.html'
            })
            .state('giftcards.receive', {
                url: '/receive',
                templateUrl: 'public/giftcards/views/receive.html'
            });
    }
]);
