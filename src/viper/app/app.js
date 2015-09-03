(function () {

    'use strict';

    var viper =
        angular.module('viper', ['smart-table', 'ui.bootstrap']);

    viper.run(['url', 'token', function (url, token) {
        if (!token.hasVal() && location.pathname != url.login)
            url.redirect.toLogin();
    }])
})();