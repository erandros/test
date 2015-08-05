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
