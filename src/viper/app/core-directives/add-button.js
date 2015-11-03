(function () {
    'use strict';

    angular
    .module('viper')
    .directive('addButton', ['$modal', function ($modal) {
        function AddModal($modalInstance, $scope) {
            var vm = this;
        }
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/edition.html',
                    controller: ['$modalInstance', '$scope', AddModal]
                })
                .result.then(function (client) {
                    console.log("Should be adding item");
                }, function () {

                })
            })
        }
        return {
            restrict: 'E',
            require: '^vpTable',
            link: link,
            template: '<button class="btn btn-primary btn">Create New</button>'
        };
    }])
})();