(function () {
    'use strict';

    angular
    .module('viper')
    .controller('dashboardController', ['$scope', 'reports', dashboardController]);

    function dashboardController($scope, reports) {
        $scope.counts = {
            Scrapes: 0
        };
        reports.count()
        .then(function (res) {
            $scope.counts = res.data;
        })
    }
})();
