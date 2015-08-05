// app.js 
(function () {

    'use strict';

    angular.module('booksApp', ['booksServices', 'smart-table']);
    angular.module('adminApp', ['clientsServices', 'smart-table', 'ui.bootstrap']);
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
// admin/clients/clients.controller.js 
(function () {
    'use strict';
    angular
    .module('adminApp')
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
            creationEditionModal(true, client);
        }
        function createModal() {
            creationEditionModal(false);
        }

        function creationEditionModal(isEdition, client) {
            if (!client) client = {};
            $modal.open({
                templateUrl: '/modals/client/creation-edition.html',
                controller: ['$modalInstance', '$scope', 'client', CreationEditionModal],
                resolve: { client: function () { return client; }}
            })
            .result.then(function (client) {
                var pm = isEdition ? client.$put() : clients.post({ id: null }, client).$promise;
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
// admin/clients/clients.services.js 
(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl + '/clients/:id', { id: '@Id' }, {
            put: { method: 'put' },
            post: { method: 'post', url: apiUrl + '/clients/' }
        });
    }])
    .factory('apiUrl', ['$location', function ($location) {
        return "http://55bbb663fa012f110018d01f.mockapi.io";
    }]);



})();
// admin/core/sidebar.controller.js 
(function () {
    'use strict';

    angular
    .module('adminApp')
    .controller('sidebarController', sidebar);

    sidebar.$inject = ['$location']; 
    function sidebar($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'sidebar';

        activate();

        function activate() { }
    }
})();