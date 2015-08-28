(function () {
    'use strict';
    angular
    .module('viper')
    .controller('loginController', ['$scope', '$location', 'token', loginController])

    function loginController($scope, $location, token) {
        $scope.user = {};
        $scope.submit = function (user) {
            token.init(user)
        }
    }
})();