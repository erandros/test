(function () {
    'use strict';

    angular
    .module('viper')
    .factory('api', ['$http', function ($http) {
        function ajax(method, _url) {
            if (_url[0] != '/') _url = '/' + _url;
            _url = '/api' + _url;
            return function (data) {
                if (method == 'put' || method == 'delete' || method == 'post')
                    if (!data) throw new Error('Required data is not truthy');
                if (method == 'put' || method == 'delete') {
                    if (data.Id == null) throw new Error('Required Id field on data is not truthy');
                    _url += '/' + data.Id;
                }
                if (method == 'delete')
                    data = null; //Don't send any data on delete
                return $http({
                    method: method,
                    url: _url,
                    data: data
                });
            }
        }
        function multiajax(method, url) {
            if (method != 'delete' && method != 'put')
                throw new Error('Multiajax only enabled for delete and put');
            return function (arr) {
                if (Object.prototype.toString.call(arr) !== '[object Array]')
                    throw new Error('Multiajax data only receives arrays');
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    //Id field should be a positive number or string
                    if (arr[i].Id == null || !isNaturalNumber(arr[i].Id))
                        throw new Error("Tried to do multiajax and one object didn't have a natural number as an Id property");
                }
                var ajaxes = [];
                for (var i = 0; i < length; i++) {
                    ajaxes.push(ajax(method, url)(arr[i]));
                }
                return Promise.all(ajaxes);
            }
        }
        return {
            request: $http,
            create: function (url) {
                return {
                    get: ajax('get', url),
                    post: ajax('post', url),
                    delete: ajax('delete', url),
                    deleteMany: multiajax('delete', url),
                    put: ajax('put', url),
                    putMany: multiajax('put', url)
                }
            }
        }
    }])
})();