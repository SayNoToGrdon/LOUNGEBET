'use strict';
var Vbet = angular
    .module('Vbet', [
        'ui.router'
    ]);
Vbet.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);
Vbet.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('!');
}]);