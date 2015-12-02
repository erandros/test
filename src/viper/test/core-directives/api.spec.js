
describe('viper', function() {
  var scope, httpBackend, _api, people;
  beforeEach(module('viper'));
  var people;
  describe('api', function() {
    beforeEach(inject(function (api, $httpBackend) {
      people = [
        {Id: 0, Name: 'Albert'},
        {Id: 1, Name: 'John'},
        {Id: 2, Name: 'Mike'},
        {Id: 3, Name: 'Steve'},
        {Id: 4, Name: 'Luke'},
        {Id: 5, Name: 'James'},
        {Id: 6, Name: 'Mark'},
      ];
      _api = api.create('people');
      httpBackend = $httpBackend;
      $httpBackend.when("GET", "/api/people").respond(people);
      $httpBackend.whenRoute("DELETE", "/api/people/:id")
      .respond(function(method, url, data, headers, params) {
        var length = people.length;
        for(var i = 0; i < length; i++) {
          var person = people[i];
          if(person.Id == params.id) {
            people.splice(i, 1);
            break;
          }
        }
        return [200];
      })
    }));

    afterEach(function() { httpBackend.verifyNoOutstandingRequest() });

    it("should delete correctly", function () {
      _api.get()
      .then(function(res) {
        expect(res.data.length).toEqual(7);
        return _api.deleteMany([{Id: 5}, {Id: 4}, {Id: 4}])
      })
      .then(function(res) {
        return _api.get();
      })
      .then(function(res) {
        expect(res.data.length).toEqual(5);
      })
      httpBackend.flush(5);
    });

  });
});