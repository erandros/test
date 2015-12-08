(function () {
    'use strict';

    angular
    .module('viper')
    .directive('editButton', ['$modal', 'utils', function ($modal, utils) {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/edit.html',
                    controller: 'EditModalCtrl',
                    resolve: {
                        fields: function () {
                            return utils.typify(scope.editFields);
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
                    var cb = scope.api.put(form)
                    scope.clear();
                    cb.then(function () {
                        scope.refresh();
                    });
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
    .controller('EditModalCtrl', ['$modalInstance', '$scope', 'utils', 'fields', 'type', 'row', 
        function ($modalInstance, $scope, utils, fields, type, row) {
        var vm = this;
        $scope.form = utils.clone(row);
        $scope.fields = fields;
        $scope.type = type;
    }])

})();