(function () {

    'use strict';

    var deps = ['smart-table', 'ui.bootstrap'];
    if (!jasmine) deps.push('ngMockE2E');
    var viper =
        angular.module('viper', deps);

    function trackDigests(app) {
        app.run(["$rootScope", function ($rootScope) {
            Promise.setScheduler(function (cb) {
                $rootScope.$evalAsync(cb);
            });
        }]);
    }

    trackDigests(viper);
})();