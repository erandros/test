(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpTable', ['$injector', '$location', 'utils', function ($injector, $location, utils) {
        function link(scope, element, attrs, ctrl) {
            var type = attrs['type'];
            if (!attrs.hasOwnProperty('api')) {
                attrs['api'] = type.pluralize();
            }
            if (!attrs.hasOwnProperty('title')) {
                attrs['title'] = type.capitalizeFirstLetter().pluralize();
            }
            scope.api = $injector.get(attrs['api']);
            scope.type = attrs["type"];
            scope.title = attrs["title"];
            scope.fields = attrs["fields"].split(',');
            scope.headers = attrs["headers"].split(',');
            scope.createButton = attrs["createButton"];
            scope.editFields = attrs["editFields"] || attrs["fields"];
            scope.linkRows = Boolean(attrs["linkRows"]);
            if (scope.linkRows) {
                scope.$location = $location;
            }
            scope.searchField = attrs["searchField"] || (function () {
                //Use these defaults values if no searchField is specified
                if (scope.fields.indexOf("Name") > -1) return "Name";
                if (scope.fields.indexOf("Title") > -1) return "Title";
            })();
            scope.itemsByPage = attrs["itemsByPage"] || 10;
            if ([undefined, null, "default", "checkbox"].indexOf(attrs.mode) < 0)
                throw new Error("Invalid mode: check the above line for valid values");
            scope.mode = attrs["mode"] || "default";
            scope.selectedRows = [];
            scope.stTable = ctrl[0];
            scope.ctrl = ctrl[1];
            scope.ctrl.refresh();
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/table.html',
            controller: ['$scope', ViperTable],
            require: ['^stTable', 'vpTable'],
            transclude: {
                'tableHeader': '?table-header',
                'titleHeader': '?title-header'
            }
        };
        function ViperTable($scope) {
            var vm = this;
            this.clear = function () {
                $scope.selectedRows = [];
                $scope.rows = $scope.displayedRows = null;
            }
            this.refresh = function () {
                vm.clear();
                return $scope.api.getAll()
                .then(function (res) {
                    $scope.rows = res.data.map(function (el) { return utils.flatten(el) });
                    $scope.displayedRows = [].concat($scope.rows);
                })
            }
            this.select = function (row, mode) {
                $scope.stTable.select(row, mode);
            }
            this.selectRow = function (row) {
                $scope.selectedRows.push(row);
            }
            this.deselectRow = function (row) {
                var rows = $scope.selectedRows;
                $scope.selectedRows.splice(rows.indexOf(row), 1);
            }
            this.deleteSelected = function () {
                $scope.api.deleteMany($scope.selectedRows)
                .then(function (res) {
                    vm.refresh();
                });
            }
        }
    }])
})();