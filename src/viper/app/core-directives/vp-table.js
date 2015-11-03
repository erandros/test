(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpTable', ['$modal', '$injector', function ($modal, $injector) {
        function ViperTable($modalInstance, $scope) {
            var vm = this;
        }
        function link(scope, element, attrs) {
            scope.api = $injector.get(attrs['api']);
            scope.api.get()
            .then(function (res) {
                for (var i = 1; i < 50; i++) {
                    res.data.push(Object.create(res.data[0]));
                    res.data[i].Id = i + 1;
                }
                scope.rows = res.data;
                scope.displayedRows = [].concat(scope.rows);
            })
            scope.title = attrs["title"];
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