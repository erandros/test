(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl + '/api/books/', {}, {
            query: { method: 'GET', params: {}, isArray: true }
        });
    }])
    .factory('apiUrl', ['$location', function ($location) {
        var host = $location.host();
        return host == 'localhost' 
            ? 'http://localhost:5001'
            : 'https://api.viper.com'
    }]);



})();