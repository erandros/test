(function () {
    'use strict';

    angular
    .module('viper')
    .directive('addButton', ['$modal', function ($modal) {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/create.html',
                    controller: 'AddModalCtrl',
                    resolve: {
                        fields: function () {
                            return scope.fields;
                        },
                        type: function () {
                            return scope.type;
                        }
                    }
                })
                .result.then(function (client) {
                    console.log("Should be adding item");
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
        $scope.fields = fields;
        $scope.type = type;
    })
    
})();