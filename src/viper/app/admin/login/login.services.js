(function () {
    'use strict';
    angular
    .module('loginApp')
    .factory('token', ['Restangular', function (Restangular) {
        return Restangular.all('clients');
    }])
})();