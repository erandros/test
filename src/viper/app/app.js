(function () {

    'use strict';

    var viper =
        angular.module('viper', ['smart-table', 'ui.bootstrap']);

    viper.run([function () {
        var token = sessionStorage.getItem('token');
        var loginUrl = "/Account/Login";
        if (!token && location.pathname != loginUrl)
            location.pathname = loginUrl;
    }])
    viper.factory('apiUrl', function() {
        var apiUrl = {};
        apiUrl.base = 'https://api.fitmentgroup.com',
        apiUrl.api = apiUrl.base + '/api';
        return apiUrl;
    });

})();