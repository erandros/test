(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var appsApi = api.create('/applications');
        return appsApi;
    }])
})();