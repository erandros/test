(function () {
    'use strict';

    angular
    .module('viper')
    .directive('deleteButton', ['$modal', function ($modal) {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/delete.html',
                    controller: 'DeleteModalCtrl',
                    resolve: {
                        type: function () {
                            return scope.type;
                        },
                        row: function () {
                            return scope.row;
                        }
                    }
                })
                .result.then(function (form) {
                    scope.api.delete({ Id: scope.row.Id });
                }, function () {

                })
            })
        }
        return {
            restrict: 'E',
            transclude: false,
            require: '^vpTable',
            link: link,
            template: '<button class="btn btn-danger btn-xs">Delete</button>',
            scope: false
        };
    }])
    .controller('DeleteModalCtrl', function ($modalInstance, $scope, type, row) {
        var vm = this;
        $scope.form = {};
        $scope.type = type;
        $scope.row = row;
    })

})();