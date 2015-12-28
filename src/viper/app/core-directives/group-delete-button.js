(function () {
    'use strict'

    angular
    .module('viper')
    .directive('vpGroupDeleteButton', ['$uibModal', function ($uibModal) {
        
        function link(scope, element, attrs, ctrl) {
            element.bind('click', function () {
                var inst = $uibModal.open({
                    templateUrl: '/templates/modals/delete.html',
                    controller: 'DeleteModalCtrl',
                    resolve: {
                        length: function () {
                            return scope.selectedRows.length;
                        }
                    }
                })
                inst.result.then(function () {
                    console.log('Tried to delete the following rows: ');
                    console.log(scope.selectedRows);
                    ctrl.deleteSelected();
                });
            });
        }
        return {
            link: link,
            require: '^vpTable',
            template: '<button class="btn btn-danger" ng-disabled="selectedRows.length < 1">Delete</button>'
        }
    }])
    .controller('DeleteModalCtrl', ['$uibModalInstance', '$scope', 'length',
        function ($uibModalInstance, $scope, length) {
            var vm = this;
            $scope.length = length;
        }
    ])
})();