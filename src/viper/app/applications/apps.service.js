(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var appsApi = api.create('/applications');
        appsApi.getTypes = function () {
            return api.request({
                method: method,
                url: '/api/applicationtypes'
            });
        }
        return appsApi;
    }])
})();