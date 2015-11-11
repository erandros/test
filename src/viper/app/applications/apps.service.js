(function () {
    'use strict';

    angular
    .module('viper')
    .factory('applications', ['api', function (api) {
        var res = api('/user/applications');
        var _get = res.get;
        res.get = function (data) {
            return _get(data)
            .then(function (res) {
                res.data = res.data.map(function (el) {
                    return {
                        Id: el.ApplicationId,
                        Type: el.ApplicationType,
                        Name: el.Name,
                        Title: el.Title,
                        IsDefault: el.IsDefault
                    }
                })
                return res;
            })
        }
        return res;
    }])
})();