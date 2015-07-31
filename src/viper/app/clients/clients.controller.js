(function () {
    'use strict';
    angular
    .module('clientsApp')
    .controller('clientsController', ['$scope', 'clients', clientsController])

    function clientsController($scope, clients) {
        $scope.query = query;
        $scope.remove = remove;

        query();
        
        function remove(client) {
            client.$delete()
            .then(function () {
                query();
            });
        }

        function query() {
            $scope.clients = clients.query();
            $scope.displayedClients = [].concat($scope.displayedClients);
        }

        function edit(client) {

        }
    }

})();