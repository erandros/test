(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices.factory('Clients', ['$resource',
      function ($resource) {
          return $resource('/api/clients/', {}, {
              query: { method: 'GET', params: {}, isArray: true }
          });
      }]);

})();