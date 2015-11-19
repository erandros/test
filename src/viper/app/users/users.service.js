(function () {
    'use strict';
    var viper = angular.module('viper');

    viper.factory('users', ['api', function (api) {
        var usersApi = api.create('/users');
        usersApi.delete = function (data) {
            if (!data || !data.Id) throw new Error('No data to erase');
            return api.request({
                method: 'delete',
                url: '/api/users/' + data.Id
            })
        }
        usersApi.put = function (data) {
            if (!data || !data.Id) throw new Error('No data to put');
            return api.request({
                method: 'put',
                data: data,
                url: '/api/users/' + data.Id
            })
        }
        return usersApi;
    }])
})();