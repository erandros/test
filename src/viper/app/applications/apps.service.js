(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var res = api('/applications');
        var _get = res.get;
        res.get = function (data) {
            return _get(data)
        }
        return res;
    }])
})();