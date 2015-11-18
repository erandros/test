(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var appsApi = api.create('/applications');
        appsApi.delete = function (data) {
            if (!data || !data.Id) throw new Error('No data to erase');
            return api.request({
                method: 'delete',
                url: '/api/applications/' + data.Id
            })
        }
        appsApi.put = function (data) {
            if (!data || !data.Id) throw new Error('No data to put');
            return api.request({
                method: 'put',
                data: data,
                url: '/api/applications/' + data.Id
            })
        }
        return appsApi;
    }])
})();