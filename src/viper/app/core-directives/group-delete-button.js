(function () {
    'use strict'

    angular
    .module('viper')
    .directive('groupDeleteButton', function () {
        
        function link(scope, element, attrs) {
            element.bind('click', function () {
                console.log('Tried to delete the following rows: ');
                console.log(scope.selectedRows);
            });
        }
        return {
            link: link,
            require: '^vpTable',
            template: '<button class="btn btn-danger" ng-disabled="selectedRows.length < 1">Delete</button>',
        }
    });
})();