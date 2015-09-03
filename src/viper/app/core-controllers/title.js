(function () {
    'use strict';

    angular
    .module('viper')
    .controller('titleController', ['$scope', 'application', function ($scope, application) {
        $scope.Title = application.Title;
    }])
})();