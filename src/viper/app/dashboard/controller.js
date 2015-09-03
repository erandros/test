(function () {
    'use strict';

    angular
    .module('viper')
    .controller('dashboardController', ['$scope', 'application', dashboardController]);

    function dashboardController($scope, application) {
        $scope.Name = application.Name;
    }
})();
