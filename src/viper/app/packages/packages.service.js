(function () {
    'use strict';

    angular
    .module('viper')
    .factory('packages', ['api', function (api) {
        return api.create('/packages');
    }])
})();