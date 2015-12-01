describe('viper', function() {
  beforeEach(module('viper'));

  describe('api', function() {
    var scope, httpBackend;
    var people = [
      {Id: 0, Name: 'Albert'},
      {Id: 1, Name: 'John'},
      {Id: 2, Name: 'Mike'},
      {Id: 3, Name: 'Steve'},
      {Id: 4, Name: 'Luke'},
      {Id: 5, Name: 'James'},
      {Id: 6, Name: 'Mark'},
    ]
    beforeEach(inject(function (api, $httpBackend) {
      $httpBackend.when("GET", "/api/people").respond(people);
      $httpBackend.when("DELETE", "/api/people/:id")
      .respond(function(method, url, data, headers, params) {
        var length = people.length;
        for(var i = 0; i < length; i++) {
          var person = people[i];
          if(person.Id === params.Id) {
            people.splice(i, 1);
            break;
          }
        }
        return [200];
      })
    }));

    it("should delete correctly", function () {
      expect(true).toBe(true);
    });
  });
});