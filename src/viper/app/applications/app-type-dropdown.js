(function () {
    'use strict'

    angular
    .module('viper')
    .directive('appTypeDropdown', function () {
        function link(scope, element, attrs, ctrl) {
            element.bind('click', function () {
            });
        }
        return {
            link: link,
            template: '<select class="form-control" ng-model="selectedAppType"' + 
                      ' ng-options="type as type.Name for type in appTypes track by type.Id">' +
                      ' </select><button class="btn btn-primary">Change</button>',
            controller: ['$scope', 'appTypes', AppTypeDropdown]
        }
        function AppTypeDropdown($scope, appTypes) {
            appTypes.get()
            .then(function (res) {
                $scope.appTypes = res.data;
                $scope.appTypes.unshift({ Id: -1, Name: '' })
                $scope.selectedAppType = $scope.appTypes[0];
            })
        }
    });
})();