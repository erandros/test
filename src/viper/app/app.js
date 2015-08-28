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
    viper.factory('token', ['$http', 'apiUrl', function ($http, apiUrl) {
        var token = {
            val: function (val) {
                if (val) return sessionStorage.setItem('token', val);
                return sessionStorage.getItem('token');
            },
            init: function (user) {
                user["grant_type"] = 'password';
                return $.post(apiUrl.base + '/Token', user)
                .then(function (res) {
                    token.val(res.access_token);
                });
            }
        }
        return token;
    }])
    viper.factory('apiUrl', function() {
        var apiUrl = {};
        apiUrl.base = 'https://api.fitmentgroup.com',
        apiUrl.api = apiUrl.base + '/api';
        return apiUrl;
    });
    viper.run(['token', function (token) {
        var loginUrl = "/Account/Login";
        if (!token && location.pathname != loginUrl)
            location.pathname = loginUrl;
    }])
})();