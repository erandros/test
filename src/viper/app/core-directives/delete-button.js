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
                        fields: function () {
                            return scope.fields;
                        },
                        type: function () {
                            return scope.type;
                        }
                    }
                })
                .result.then(function (form) {
                    scope.api.delete(form);
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
    .controller('DeleteModalCtrl', function ($modalInstance, $scope, fields, type) {
        var vm = this;
        $scope.form = {};
        $scope.fields = fields;
        $scope.type = type;
        $scope.id = fields['Id'];
    })

})();