(function () {
    'use strict';
    angular
    .module('viper')
    .factory('token', ['Restangular', function (Restangular) {
        return Restangular.all('clients');
    }])
})();