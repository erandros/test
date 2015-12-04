(function () {
    'use strict'

    angular
    .module('viper')
    .directive('appTypeDropdown', ['applications', 'notify', function (applications, notify) {
        function link(scope, element, attrs, ctrl) {
            applications.getTypes()
            .then(function (res) {
                scope.appTypes = res.data;
                scope.appTypes.unshift({ Id: -1, Name: '' })
                scope.selectedAppType = scope.appTypes[0];
            })
            element.children('button').bind('click', function () {
                var length = scope.selectedRows.length;
                for (var i = 0; i < length; i++) {
                    scope.selectedRows[i].ApplicationTypeId = scope.selectedAppType.Id;
                }
                applications.putMany(scope.selectedRows)
                .then(function () {
                    notify.success('Application types updated');
                    ctrl.refresh();
                })
            });
        }
        return {
            link: link,
            template: '<select class="form-control" ng-model="selectedAppType"' + 
                      ' ng-options="type as type.Name for type in appTypes track by type.Id">' +
                      ' </select>' +
                      ' <button class="btn btn-primary"' + 
                      ' ng-disabled="selectedRows.length < 1 || selectedAppType.Id == -1">Change</button>',
            scope: false,
            require: '^vpTable'
        }
    }]);
})();