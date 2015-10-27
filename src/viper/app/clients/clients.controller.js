(function () {
    'use strict';
    angular
    .module('viper')
    .controller('clientsController', ['$scope', '$modal', 'clients', clientsController])

    function clientsController($scope, $modal, clients) {
        refresh();

        function refresh() {
            clients.get()
            .then(function (res) {
                $scope.clients = res.data;
                $scope.displayedClients = [].concat($scope.clients);
            })
        }

    }

})();