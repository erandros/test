(function () {
    'use strict';
    angular
    .module('clientsApp')
    .controller('clientsController', ['$scope', '$modal', 'clients', clientsController])

    function clientsController($scope, $modal, clients) {
        $scope.removeModal = removeModal;
        $scope.editModal = editModal;
        $scope.createModal = createModal;

        refresh();
        
        function removeModal(client) {
            $modal.open({
                templateUrl: '/modals/client/confirm-delete.html',
                controller: ['$modalInstance', '$scope', 'client', DeleteClientModal],
                resolve: { client: function () { return client; } }
            })
            .result.then(function (client) {
                client.$delete().then(refresh);
            }, function () {

            })

            function DeleteClientModal($modalInstance, $scope, client) {
                var vm = this;
                $scope.client = client;
            }
        }

        function editModal(client) {
            creationEditionModal(client, true);
        }
        function createModal(client) {
            creationEditionModal(client, false);
        }

        function creationEditionModal(client, isEdition) {
            $modal.open({
                templateUrl: '/modals/client/creation-edition.html',
                controller: ['$modalInstance', '$scope', 'client', CreationEditionModal],
                resolve: { client: function () { return client; }}
            })
            .result.then(function (client) {
                var pm = isEdition ? clients.put(client).$promise : client.$save();
                pm.then(refresh);
            })

            function CreationEditionModal($modalInstance, $scope, client) {
                var vm = this;
                $scope.client = client;
            }
        }

        function refresh() {
            $scope.clients = clients.query();
            $scope.displayedClients = [].concat($scope.displayedClients);
        }

    }

})();