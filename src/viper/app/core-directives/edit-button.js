(function () {
    'use strict';

    angular
    .module('viper')
    .directive('editButton', ['$modal', function ($modal) {
        function EditModal($modalInstance, $scope) {
            var vm = this;
        }
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/templates/modals/edition.html',
                    controller: ['$modalInstance', '$scope', EditModal]
                })
                .result.then(function (client) {
                    console.log("Should be editing item");
                }, function () {

                })
            })
        }
        return {
            restrict: 'E',
            link: link,
            template: '<button class="btn btn-primary btn-xs">Edit</button>'
        };
    }])
})();