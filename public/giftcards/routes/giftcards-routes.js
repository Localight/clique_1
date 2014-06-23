'use strict';

//Setting up route
angular.module('mean.giftcards').config(['$stateProvider', '$logProvider', '$urlRouterProvider',

    function($stateProvider, $logProvider, $urlRouterProvider) {

        // $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider

            .state('giftcards.give', {
                url: '/give',
                template: 'I need a massage'
            })

            .state('giftcards.receive', {
                url: '/receive',
                templateUrl: 'public/giftcards/views/receive.html'
            });
    }
]);
