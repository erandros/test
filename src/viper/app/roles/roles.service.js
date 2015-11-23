(function () {
    'use strict';

    angular
    .module('viper')
    .factory('roles', ['api', function (api) {
        var rolesApi = api.create('/roles');
        return rolesApi;
    }])
})();