(function () {
    'use strict';

    angular
    .module('viper')
    .factory('api', ['$http', 'url', 'token', function ($http, url, token) {
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