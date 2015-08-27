(function () {

    'use strict';

    angular.module('booksApp', ['booksServices', 'smart-table']);
    var viper =
        angular.module('viper', ['clientsServices', 'restangular', 'smart-table', 'ui.bootstrap']);

    viper.config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('https://api.fitmentgroup.com');
    }])
    viper.run(['Restangular', function (Restangular) {
        var token = sessionStorage.getItem('token');
        //if (!token) location.href = "/Account/Login";
        Restangular.setDefaultHeaders('Authorization', 'Bearer ' + token)
    }])

    angular.module('loginApp', ['restangular']);
})();