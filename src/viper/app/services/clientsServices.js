(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', function ($resource) {
        return {
            query: function () { return [
                { id: 1, name: 'NiceWheels', domain: 'nicewheels.viper.com' },
                { id: 2, name: "AwesomeTires", domain: 'awesometires.viper.com' }
            ]}
        };
    }]);

})();