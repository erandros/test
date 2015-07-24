// app.js 
(function () {

    'use strict';

    angular.module('booksApp', ['booksServices', 'smart-table']);
    angular.module('adminApp', ['clientsServices', 'smart-table']);
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
    .controller('clientsController', ['$scope', 'clients', clientsController])

    function clientsController($scope, clients) {
        $scope.clients = clients.query();
        debugger;
    }

})();
// clients/clients.services.js 
(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', function ($resource) {
        return {
            query: function () { return [
                { id: 1, name: 'NiceWheels', domain: 'nicewheels.viper.com' },
                { id: 2, name: "AwesomeTires", domain: 'awesometires.viper.com' }
            ]}
        };
    }]);

})();