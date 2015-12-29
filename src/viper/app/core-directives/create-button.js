(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpCreateButton', ['$uibModal', '$injector', 'utils', function ($uibModal, $injector, utils) {
        function link(scope, element, attrs, ctrl) {
            scope.attrs = attrs;
            scope.fields = utils.typify(attrs.fields);
            scope.dropdownData = {};
            scope.fields.forEach(function (field) {
                if (field.type == 'dropdown') {
                    var service = $injector.get(field.params[0]);
                    service[field.params[1]]()
                    .then(function (res) {
                        scope.dropdownData[field.name] = res.data
                    });
                }
            })
            function api() {
                if (!scope.api) scope.api = $injector.get(attrs.api);
                return scope.api;
            }
            element.bind('click', function () {
                $uibModal.open({
                    templateUrl: '/templates/modals/create.html',
                    controller: 'AddModalCtrl',
                    resolve: {
                        dropdownData: function() {
                            return scope.dropdownData;
                        },
                        fields: function () {
                            return scope.fields;
                        },
                        type: function () {
                            return scope.type;
                        }
                    }
                })
                .result.then(function (form) {
                    api().post(form)
                    .then(ctrl.refresh);
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
    .controller('AddModalCtrl', ['$uibModalInstance', '$scope', 'fields', 'type', 'dropdownData',
        function ($uibModalInstance, $scope, fields, type, dropdownData) {
        var vm = this;
        $scope.dropdownData = dropdownData;
        $scope.form = {};
        $scope.fields = fields;
        $scope.type = type;
    }])
    
})();