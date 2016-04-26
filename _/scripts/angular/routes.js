'use strict';

Vbet
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/casino.html',
                controller: 'Ctrl'
            });
    }]);