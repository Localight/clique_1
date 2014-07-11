'use strict';

//Setting up route
angular.module('mean.gifts').config(['$stateProvider', '$logProvider', '$urlRouterProvider',

    function($stateProvider, $logProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider
            .state('gift.one', {
                url: '/one',
                templateUrl: 'public/recipients/views/one.html',
            }).state('gift.two', {
                url: '/two',
                templateUrl: 'public/recipients/views/two.html',
            });
    }
]);