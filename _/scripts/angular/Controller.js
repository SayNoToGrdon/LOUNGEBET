'use strict';
Vbet
    .controller('Ctrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.$on('$viewContentLoaded', function (event) {

        });
        $scope.$on('$stateChangeSuccess', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 400);
        });
    }]);