
(function () {
    'use strict';

    var deps = ['smart-table', 'ui.bootstrap', 'countUpModule', 'angular-loading-bar', 'checklist-model'];
    if (window.jasmine === undefined) deps.push('ngMockE2E');
    var viper =
        angular.module('viper', deps);

    function trackDigests(app) {
        app.run(["$rootScope", function ($rootScope) {
            Promise.setScheduler(function (cb) {
                $rootScope.$evalAsync(cb);
            });
        }]);
    }
    
    viper.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 100;
    }])

    trackDigests(viper);
})();