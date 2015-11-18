(function () {
    'use strict';

    angular
    .module('viper')
    .directive('createButton', ['$modal', function ($modal) {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/create.html',
                    controller: 'AddModalCtrl',
                    resolve: {
                        fields: function () {
                            return typifyFields(scope.createFields);
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
            template: '<button class="btn btn-primary btn">Create New</button>',
            scope: false
        };
    }])
    .controller('AddModalCtrl', function ($modalInstance, $scope, fields, type) {
        var vm = this;
        $scope.form = {};
        $scope.fields = fields;
        $scope.type = type;
    })
    
})();