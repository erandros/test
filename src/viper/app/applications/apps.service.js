(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var appsApi = api.create('/applications');
        appsApi.getTypes = api.request({ url: '/api/applicationtypes' });
        return appsApi;
    }])
})();