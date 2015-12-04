(function () {
    'use strict'

    angular
    .module('viper')
    .directive('groupDeleteButton', function () {
        
        function link(scope, element, attrs, ctrl) {
            element.bind('click', function () {
                console.log('Tried to delete the following rows: ');
                console.log(scope.selectedRows);
                ctrl.deleteSelected();
            });
        }
        return {
            link: link,
            require: '^vpTable',
            template: '<button class="btn btn-danger" ng-disabled="selectedRows.length < 1">Delete</button>'
        }
    });
})();