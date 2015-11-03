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
            scope.headers = attrs["headers"].split(',');
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'templates/vp-table.html'
        };
    }])
})();