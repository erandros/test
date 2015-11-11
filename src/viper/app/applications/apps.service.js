(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var res = api('/user/users/my/applications');
        var _get = res.get;
        res.get = function (data) {
            return _get(data)
        }
        return res;
    }])
})();