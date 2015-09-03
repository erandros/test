(function () {
    'use strict';

    angular
    .module('viper')
    .factory('token', ['$http', 'url', function ($http, url) {
        var token = {
            val: function (val) {
                if (val) return sessionStorage.setItem('token', val);
                return sessionStorage.getItem('token');
            },
            hasVal: function () {
                var val = token.val();
                return (val != "null" && val != null);
            },
            init: function (user) {
                user["grant_type"] = 'password';
                return $.post(url.api.base + '/Token', user)
                .then(function (res) {
                    token.val(res.access_token);
                    if (url.redirect.should.toQueryString())
                        url.redirect.toQueryString();
                    else url.redirect.toRoot();
                });
            }
        }
        return token;
    }])
})();