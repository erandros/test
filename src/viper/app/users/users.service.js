(function () {
    'use strict';
    var viper = angular.module('viper');

    viper.factory('users', ['api', function (api) {
        return api('/user/users');
    }])
})()