(function () {
    'use strict'

    angular
    .module('viper')
    .directive('createAppButton', ['$injector', function ($injector) {
        function link(scope, element, attrs) {
        }
        return {
            link: link,
            template: '<vp-create-button fields="Name,ApplicationType:dropdown(applications getTypes)"></create-button>'
        }
    }])
})();