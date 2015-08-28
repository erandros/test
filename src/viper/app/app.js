(function () {

    'use strict';

    var viper =
        angular.module('viper', ['restangular', 'smart-table', 'ui.bootstrap']);

    viper.config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('https://api.fitmentgroup.com/api');
    }])
    viper.run(['Restangular', function (Restangular) {
        var token = sessionStorage.getItem('token');
        if (!token) location.href = "/Home/Login";
        Restangular.setDefaultHeaders('Authorization', 'Bearer ' + token)
    }])
})();