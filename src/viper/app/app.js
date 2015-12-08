(function () {

    'use strict';

    var viper =
        angular.module('viper', ['smart-table', 'ui.bootstrap', 'ngMockE2E']);

    function trackDigests(app) {
        app.run(["$rootScope", function ($rootScope) {
            Promise.setScheduler(function (cb) {
                $rootScope.$evalAsync(cb);
            });
        }]);
    }

    trackDigests(viper);
})();