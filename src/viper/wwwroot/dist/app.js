// app.js 
(function () {

    'use strict';

    angular.module('booksApp', ['booksServices', 'smart-table']);
    angular.module('clientsApp', ['clientsServices', 'smart-table', 'ui.bootstrap']);
})();
// books/books.controller.js 
(function () {
    'use strict';
    angular
    .module('booksApp')
    .controller('booksController', booksController)

    booksController.$inject = ['$scope', 'Books'];
    function booksController($scope, Books) {
        $scope.books = Books.query();
    }

})();
// books/books.services.js 
(function () {
    'use strict';
    var booksServices = angular.module('booksServices', ['ngResource']);

    booksServices.factory('Books', ['$resource',
      function ($resource) {
          return $resource('/api/books/', {}, {
              query: { method: 'GET', params: {}, isArray: true }
          });
      }]);

})();
// clients/clients.controller.js 
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
                    client: function () { return $scope.clients[0]; }
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
// clients/clients.services.js 
(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl + '/clients/:id', { id: '@Id' });
    }])
    .factory('apiUrl', ['$location', function ($location) {
        return "http://55bbb663fa012f110018d01f.mockapi.io";
    }]);



})();