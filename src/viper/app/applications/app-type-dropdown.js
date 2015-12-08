(function () {
    'use strict'

    angular
    .module('viper')
    .directive('appTypeDropdown', ['$filter', 'applications', 'notify', function ($filter, applications, notify) {
        function link(scope, element, attrs, ctrl) {
            applications.getTypes()
            .then(function (res) {
                scope.appTypes = res.data;
                scope.appTypes.unshift({ Id: -1, Name: '' })
                scope.selectedAppType = scope.appTypes[0];
            })
            element.children('button').bind('click', function () {
                var selected = scope.selectedRows;
                var length = selected.length;
                for (var i = 0; i < length; i++) {
                    selected[i].ApplicationTypeId = scope.selectedAppType.Id;
                }
                applications.putMany(selected)
                .then(function () {
                    notify.success('Application types updated');
                    return ctrl.refresh();
                })
                .then(function () {
                    setTimeout(function () {
                        var length = selected.length;
                        for (var i = 0; i < length; i++) {
                            $filter('filter')(scope.rows, { Id: selected[i].Id })[0].highlight = true;
                        }
                        scope.$apply();
                    }, 1);
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