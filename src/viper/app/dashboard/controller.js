(function () {
    'use strict';

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    controller.$inject = ['$location']; 

    function dashboardController($location) {
        var vm = this;
        vm.title = 'controller';

        activate();

        function activate() { }
    }
})();
