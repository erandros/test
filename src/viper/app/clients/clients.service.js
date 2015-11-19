(function () {
    'use strict';
    var viper = angular.module('viper');

    viper.factory('clients', ['api', function (api) {
        return api.create('/Clients');
    }])
})();