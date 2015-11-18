(function () {
    'use strict';

    angular
    .module('viper')
    .directive('editButton', ['$modal', function ($modal) {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/edit.html',
                    controller: 'EditModalCtrl',
                    resolve: {
                        fields: function () {
                            return typifyFields(scope.editFields);
                        },
                        type: function () {
                            return scope.type;
                        },
                        row: function () {
                            return scope.row;
                        }
                    }
                })
                .result.then(function (form) {
                    scope.api.put(form);
                }, function () {

                })
            })
        }
        return {
            restrict: 'E',
            transclude: false,
            require: '^vpTable',
            link: link,
            template: '<button class="btn btn-primary btn-xs">Edit</button>',
            scope: false
        };
    }])
    .controller('EditModalCtrl', function ($modalInstance, $scope, fields, type, row) {
        var vm = this;
        $scope.form = row;
        $scope.fields = fields;
        $scope.type = type;
    })

})();