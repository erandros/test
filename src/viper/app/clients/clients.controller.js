(function () {
    'use strict';
    angular
    .module('clientsApp')
    .controller('clientsController', ['$scope', '$modal', 'clients', clientsController])

    function clientsController($scope, $modal, clients) {
        $scope.removeModal = removeModal;
        $scope.query = query;
        $scope.remove = remove;

        query();
        
        function removeModal(client) {
            $modal.open({
                templateUrl: '/modals/confirm-delete-client.html',
                controller: ['$modalInstance', '$scope', 'client', DeleteClientModal],
                resolve: {
                    client: function () { return $scope.clients[0].Id; }
                }
            })
            .result.then(function (client) {
                remove(client);
            }, function () {

            })

            function DeleteClientModal($modalInstance, $scope, client) {
                var vm = this;
                $scope.client = client;
            }
        }

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