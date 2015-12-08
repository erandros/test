(function () {

    if (window.jasmine === undefined) {
        angular
        .module('viper')
        .run(['$httpBackend', function ($httpBackend) {
            var count = { Users: 25, Applications: 12, Clients: 101, Scrapes: 35 };
            $httpBackend.whenGET('/api/reports/count').respond(count);
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
            $httpBackend.whenDELETE(/.*/).passThrough();
            $httpBackend.whenPUT(/.*/).passThrough();
        }]);
    }
})();