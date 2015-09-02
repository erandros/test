(function () {

    'use strict';

    var viper =
        angular.module('viper', ['smart-table', 'ui.bootstrap']);

    viper.run(['url', 'token', function (url, token) {
        if (!token.hasVal() && location.pathname != url.login)
            url.redirect.toLogin();
    }])
    viper.factory('url', ['$location', function ($location) {
        var qs = $location.search();
        var url = {
            queryString: function() { return qs.redirect },
            login: '/Login',
            root: '/',
            api: {
                base: 'https://api.fitmentgroup.com/',
                api: 'https://api.fitmentgroup.com/api'
            }
        }
        var r = function (url) { location.pathname = url; }
        url.redirect = {
            should: {
                toQueryString: function() { Boolean(url.queryString); }
            },
            toQueryString: function () { r(url.queryString); },
            toRoot: function() { r(url.root); },
            toLogin: function () { r(url.login); }
        }
        return url;
    }])
    viper.factory('token', ['$http', 'url', function ($http, url) {
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
                    else url.toRoot();
                });
            }
        }
        return token;
    }])
    viper.factory('api', ['$http', 'url', 'token', function ($http, url, token) {
        function ajax(method, _url) {
            return function (data) {
                return $http({
                    url: url.api.api + _url,
                    data: data,
                    method: method,
                    headers: {
                        'Authorization': 'Bearer ' + token.val()
                    }
                });
            }
        }
        return function (url) {
            return {
                get: ajax('get', url),
                post: ajax('post', url)
            }
        }
    }])
})();