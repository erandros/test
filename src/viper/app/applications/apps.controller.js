(function () {
    'use strict';
    angular
    .module('viper')
    .controller('appsController', ['$scope', '$modal', 'applications', appsController])

    function appsController($scope, $modal, applications) {
        refresh(); 
        function refresh() {
            applications.get()
            .then(function (res) {
                for (var i = 1; i < 50; i++) {
                    res.data.push(Object.create(res.data[0]));
                    res.data[i].Id = i + 1;
                }
                $scope.applications = res.data; 
                $scope.displayedApps = [].concat($scope.applications);
            })
        }
    }
})();