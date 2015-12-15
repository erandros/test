(function () {
    'use strict';

    angular
    .module('viper')
    .factory('features', ['api', function (api) {
        return api.create('/features');
    }])
})();