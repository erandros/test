(function () {
    'use strict'

    angular
    .module('viper')
    .directive('groupDeleteButton', function () {
        
        function link(scope, element, attrs) {
            element.bind('click', function () {

            });
        }
        return {
            link: link,
            template: '<button class="btn btn-danger" ng-disabled="true">Delete</button>',
        }
    });
})();