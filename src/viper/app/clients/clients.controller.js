(function () {
    'use strict';
    angular
    .module('clientsApp')
    .controller('clientsController', ['$scope', 'clients', clientsController])

    function clientsController($scope, clients) {
        $scope.clients = clients.query();
        debugger;
    }

})();