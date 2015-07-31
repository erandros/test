(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl + '/clients/:id', { id: '@Id' });
    }])
    .factory('apiUrl', ['$location', function ($location) {
        return "http://55bbb663fa012f110018d01f.mockapi.io";
    }]);



})();