(function () {

    'use strict';

    var viper =
        angular.module('viper', ['restangular', 'smart-table', 'ui.bootstrap']);

    viper.config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('https://api.fitmentgroup.com/api');
    }])
    viper.run(['Restangular', function (Restangular) {
        var token = sessionStorage.getItem('token');
        var loginUrl = "/Account/Login";
        if (!token && location.pathname != loginUrl)
            location.pathname = loginUrl;
        Restangular.setDefaultHeaders('Authorization', 'Bearer ' + token)
    }])
})();