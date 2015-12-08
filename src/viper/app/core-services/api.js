(function () {
    'use strict';

    angular
    .module('viper')
    .factory('api', ['$http', 'utils', function ($http, utils) {
        function ajax(config) {
            config = utils.clone(config);
            if (!config) { config = {}; }
            if (!config.url) { throw new Error("Tried to create a request without url"); }
            if (!config.method) { config.method = 'GET'; }
            if (config.url[0] != '/') config.url = config.url.prepend('/');
            if (config.url.indexOf('/api') != 0) config.url = config.url.prepend('/api');
            return function (data) {
                var method = config.method;
                if (method == 'put' || method == 'delete' || method == 'post')
                    if (!data) throw new Error('Required data is not truthy');
                if (method == 'put' || method == 'delete') {
                    if (data.Id == null) throw new Error('Required Id field on data is not truthy');
                    config.url += '/' + data.Id;
                }
                if (method == 'delete')
                    data = null; //Don't send any data on delete
                config.data = data;
                return $http(config);
            }
        }
        function multiajax(config) {
            var method = config.method;
            if (method != 'delete' && method != 'put')
                throw new Error('Multiajax only enabled for delete and put');
            return function (arr) {
                if (Object.prototype.toString.call(arr) !== '[object Array]')
                    throw new Error('Multiajax data only receives arrays');
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    //Id field should be a positive number or string
                    if (arr[i].Id == null || !utils.isNatural(arr[i].Id))
                        throw new Error("Tried to do multiajax and one object didn't have a natural number as an Id property");
                }
                var ajaxes = [];
                for (var i = 0; i < length; i++) {
                    ajaxes.push(ajax(config)(arr[i]));
                }
                return Promise.all(ajaxes);
            }
        }
        return {
            requestFn: function (config) { return ajax(config); },
            create: function (url) {
                return {
                    get: ajax({ url: url }),
                    post: ajax({ method: 'post', url: url }),
                    delete: ajax({ method: 'delete', url: url }),
                    deleteMany: multiajax({ method: 'delete', url: url }),
                    put: ajax({ method: 'put', url: url }),
                    putMany: multiajax({ method: 'put', url: url })
                }
            }
        }
    }])
})();