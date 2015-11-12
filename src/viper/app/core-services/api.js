(function () {
    'use strict';

    angular
    .module('viper')
    .factory('api', ['$http', 'url', function ($http, url) {
        function ajax(method, _url) {
            return function (data) {
                return $http({
                    url: url.api + _url,
                    data: data,
                    method: method
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