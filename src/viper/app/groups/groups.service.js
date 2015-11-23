(function () {
    'use strict';

    angular
    .module('viper')
    .factory('groups', ['api', function (api) {
        var groupsApi = api.create('/groups');
        return groupsApi;
    }])
})();