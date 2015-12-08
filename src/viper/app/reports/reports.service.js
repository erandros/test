(function () {
    'use strict';

    angular
    .module('viper')
    .factory('reports', ['api', function (api) {
        var reportsApi = {
            count: api.requestFn({ url: 'reports/count' })
        }
        return reportsApi;
    }])
})();