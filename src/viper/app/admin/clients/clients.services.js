(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['Restangular', function (Restangular) {
        return Restangular.all('clients');
    }])



})();