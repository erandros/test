(function () {
    'use strict';

    angular
    .module('viper')
    .factory('appTypes', ['api', function (api) {
        var appTypesApi = api.create('/applicationtypes');
        return appTypesApi;
    }])
})();