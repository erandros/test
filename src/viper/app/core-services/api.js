(function () {
    'use strict';

    angular
    .module('viper')
    .factory('api', ['$http', function ($http) {
        function ajax(method, _url) {
            return function (data) {
                return $http({
                    method: method,
                    url: '/api' + _url,
                    data: data
                });
            }
        }
        return {
            request: $http,
            create: function (url) {
                return {
                    get: ajax('get', url),
                    post: ajax('post', url)
                }
            }
        }
    }])
})();