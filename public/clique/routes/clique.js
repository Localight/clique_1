'use strict';

var cliqueApp = angular.module('cliqueApp', ['ui.router']);

cliqueApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: 'home',
      template: '<h1>help</h1>'
    });

});