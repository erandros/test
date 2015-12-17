(function () {

    angular
    .module('viper')
    .controller('groupsController', ['$scope', function ($scope) {
        $scope.mapRole = function (role) {
            return {
                ApplicationGroupId: $scope.Id,
                ApplicationRoleId: role.Id
            }
        }
    }]);
})();