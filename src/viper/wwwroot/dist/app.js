// app.js 
(function () {

    'use strict';

    var viper =
        angular.module('viper', ['restangular', 'smart-table', 'ui.bootstrap']);

    viper.config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('https://api.fitmentgroup.com/api');
    }])
    viper.run(['Restangular', function (Restangular) {
        var token = sessionStorage.getItem('token');
        if (!token) location.href = "/Account/Login";
        Restangular.setDefaultHeaders('Authorization', 'Bearer ' + token)
    }])
})();
// clients/clients.controller.js 
(function () {
    'use strict';
    angular
    .module('viper')
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
            clients.getList()
            .then(function (clients) {
                $scope.clients = clients;
                $scope.displayedClients = [].concat($scope.displayedClients);
            })
        }

    }

})();
// clients/clients.services.js 
(function () {
    'use strict';
    var viper = angular.module('viper');

    viper
    .factory('clients', ['Restangular', function (Restangular) {
        return Restangular.all('clients');
    }])



})();
// core/sidebar.controller.js 
(function () {
    'use strict';

    angular
    .module('viper')
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
// login/login.controller.js 
(function () {
    'use strict';
    angular
    .module('viper')
    .controller('loginController', ['$scope', loginController])

    function loginController($scope) {

    }
})();
// login/login.services.js 
(function () {
    'use strict';
    angular
    .module('viper')
    .factory('token', ['Restangular', function (Restangular) {
        return Restangular.all('clients');
    }])
})();