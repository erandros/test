(function () {
    'use strict';

    angular
    .module('viper')
    .factory('url', ['$location', function ($location) {
        var qs = $location.search();
        var url = {
            queryString: function () { return qs.redirect },
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
                toQueryString: function () { Boolean(url.queryString); }
            },
            toQueryString: function () { r(url.queryString); },
            toRoot: function () { r(url.root); },
            toLogin: function () { r(url.login); }
        }
        return url;
    }])
})();