// app.js 
(function () {

    'use strict';

    var viper =
        angular.module('viper', ['smart-table', 'ui.bootstrap']);

    viper.run(['url', 'token', function (url, token) {
        if (!token.hasVal() && location.pathname != url.login)
            url.redirect.toLogin();
    }])
    viper.factory('url', ['$location', function ($location) {
        var qs = $location.search();
        var url = {
            queryString: function() { return qs.redirect },
            login: '/Home/Login',
            root: '/',
            api: {
                base: 'https://api.fitmentgroup.com/',
                api: 'https://api.fitmentgroup.com/api'
            }
        }
        var r = function (url) { location.pathname = url; }
        url.redirect = {
            should: {
                toQueryString: function() { Boolean(url.queryString); }
            },
            toQueryString: function () { r(url.queryString); },
            toRoot: function() { r(url.root); },
            toLogin: function () { r(url.login); }
        }
        return url;
    }])
    viper.factory('token', ['$http', 'url', function ($http, url) {
        var token = {
            val: function (val) {
                if (val) return sessionStorage.setItem('token', val);
                return sessionStorage.getItem('token');
            },
            hasVal: function () {
                var val = token.val();
                return (val != "null" && val != null);
            },
            init: function (user) {
                user["grant_type"] = 'password';
                return $.post(url.api.base + '/Token', user)
                .then(function (res) {
                    token.val(res.access_token);
                    if (url.redirect.should.toQueryString())
                        url.redirect.toQueryString();
                    else url.toRoot();
                });
            }
        }
        return token;
    }])
    viper.factory('api', ['$http', 'url', 'token', function ($http, url, token) {
        function ajax(method, _url) {
            return function (data) {
                return $http({
                    url: url.api.api + _url,
                    data: data,
                    method: method,
                    headers: {
                        'Authorization': 'Bearer ' + token.val()
                    }
                });
            }
        }
        return function (url) {
            return {
                get: ajax('get', url),
                post: ajax('post', url)
            }
        }
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
            clients.get()
            .then(function (res) {
                $scope.clients = res.data;
                $scope.displayedClients = [].concat($scope.clients);
            })
        }

    }

})();
// clients/clients.services.js 
(function () {
    'use strict';
    var viper = angular.module('viper');

    viper.factory('clients', ['api', function (api) {
        return api('/Clients');
    }])
})();
// login/login.controller.js 
(function () {
    'use strict';
    angular
    .module('viper')
    .controller('loginController', ['$scope', '$location', 'token', loginController])

    function loginController($scope, $location, token) {
        $scope.user = {};
        $scope.submit = function (user) {
            token.init(user)
        }
    }
})();
// login/login.services.js 
(function () {
    'use strict';
    angular
    .module('viper')
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