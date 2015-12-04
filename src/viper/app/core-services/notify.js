(function () {
    'use strict';

    angular
    .module('viper')
    .factory('notify', ['$http', function ($http) {
        return {
            success: success
        }
        function success(msg) {
            $.notify("Hello world");
        }
    }]);
})();