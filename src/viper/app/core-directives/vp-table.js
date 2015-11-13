(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpTable', ['$modal', '$injector', function ($modal, $injector) {
        function ViperTable($scope) {
            var vm = this;
        }
        function link(scope, element, attrs) {
            var type = attrs['type'];
            if (!attrs.hasOwnProperty('api')) {
                attrs['api'] = type.pluralize();
            }
            if (!attrs.hasOwnProperty('title')) {
                attrs['title'] = type.capitalizeFirstLetter().pluralize();
            }
            scope.api = $injector.get(attrs['api']);
            scope.api.get()
            .then(function (res) {
                scope.rows = res.data.map(function (el) { return flatten(el) });
                scope.displayedRows = [].concat(scope.rows);
            })
            scope.type = attrs["type"];
            scope.title = attrs["title"];
            scope.fields = attrs["fields"].split(',');
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'templates/vp-table.html',
            controller: ViperTable
        };
    }])
})();