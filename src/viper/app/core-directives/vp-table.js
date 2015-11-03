(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpTable', ['$modal', function ($modal) {
        function ViperTable($modalInstance, $scope) {
            var vm = this;
        }
        function link(scope, element, attrs) {
            element.bind('click', function () {
                $modal.open({
                    templateUrl: '/modals/edition.html',
                    controller: ['$modalInstance', '$scope', ViperTable]
                })
                .result.then(function (client) {
                    console.log("Should be adding item");
                }, function () {

                })
            })
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'templates/vp-table.html'
        };
    }])
})();