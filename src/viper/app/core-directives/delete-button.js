(function () {
    'use strict';

    angular
    .module('viper')
    .directive('deleteButton', ['$modal', function ($modal) {
        function link(scope, element, attrs) {
            function DeleteModal($modalInstance, $scope) {
                var vm = this;
                $scope.attrs = attrs;
            }
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/delete.html',
                    controller: ['$modalInstance', '$scope', DeleteModal]
                })
                .result.then(function (client) {
                    console.log("Should be deleting item");
                }, function () {

                })
            })
        }
        return {
            restrict: 'E',
            link: link,
            template: '<button class="btn btn-danger btn-xs">Delete</button>'
        };
    }])
})();