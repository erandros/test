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
})();