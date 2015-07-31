// app.js 
(function () {

    'use strict';

    angular.module('booksApp', ['booksServices', 'smart-table']);
    angular.module('clientsApp', ['clientsServices', 'smart-table']);
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
        $scope.rowCollection = [
            { firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com' },
            { firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com' },
            { firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com' }
        ];
        //$scope.clients = clients.query();
    }

})();
// clients/clients.services.js 
(function () {
    'use strict';
    var clientsServices = angular.module('clientsServices', ['ngResource']);

    clientsServices
    .factory('clients', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl + '/api/books/', {}, {
            query: { method: 'GET', params: {}, isArray: true }
        });
    }])
    .factory('apiUrl', ['$location', function ($location) {
        var host = $location.host();
        return host == 'localhost' 
            ? 'http://localhost:5001'
            : 'https://api.viper.com'
    }]);



})();