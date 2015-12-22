(function () {
    'use strict';
    angular
    .module('viper')
    .controller('loginController', ['$scope', '$location', loginController])

    function loginController($scope, $location) {
        $scope.user = {};
        $scope.submit = function (user) {
        }
    }
})();