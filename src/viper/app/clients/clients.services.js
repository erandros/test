(function () {
    'use strict';
    var viper = angular.module('viper');

    viper
    .factory('clients', ['Restangular', function (Restangular) {
        return Restangular.all('clients');
    }])



})();