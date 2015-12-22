(function () {
    'use strict';
    var viper = angular.module('viper');

    viper.factory('users', ['api', function (api) {
        var usersApi = api.create('/users');
        return usersApi;
    }])
})();