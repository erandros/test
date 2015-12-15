(function () {
    'use strict';

    angular
    .module('viper')
    .directive('createButton', ['$uibModal', 'utils', function ($uibModal, utils) {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $uibModal.open({
                    templateUrl: '/templates/modals/create.html',
                    controller: 'AddModalCtrl',
                    resolve: {
                        fields: function () {
                            return utils.typify(scope.createFields);
                        },
                        type: function () {
                            return scope.type;
                        }
                    }
                })
                .result.then(function (form) {
                    var cb = scope.api.post(form);
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
            template: '<button class="btn btn-primary btn">Add New</button>',
            scope: false
        };
    }])
    .controller('AddModalCtrl', ['$uibModalInstance', '$scope', 'fields', 'type',
        function ($uibModalInstance, $scope, fields, type) {
        var vm = this;
        $scope.form = {};
        $scope.fields = fields;
        $scope.type = type;
    }])
    
})();