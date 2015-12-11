

describe('viper', function() {
	beforeEach(module('viper'));
  describe('api', function() {
		var scope, httpBackend, peopleApi, people, _api;
    beforeEach(inject(function (api, $httpBackend) {
    	_api = api;
      people = [
        {Id: 0, Name: 'Albert'},
        {Id: 1, Name: 'John'},
        {Id: 2, Name: 'Mike'},
        {Id: 3, Name: 'Steve'},
        {Id: 4, Name: 'Luke'},
        {Id: 5, Name: 'James'},
        {Id: 6, Name: 'Mark'},
      ];
      peopleApi = api.create('people');
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
      $httpBackend.whenRoute("PUT", "/api/people/:id")
      .respond(function(method, url, data, headers, params) {
        var length = people.length;
        for(var i = 0; i < length; i++) {
          var person = people[i];
          if(person.Id == params.id) {
            people[i] = JSON.parse(data);
            break;
          }
        }
        return [200];
      })
    }));

    afterEach(function() { httpBackend.verifyNoOutstandingRequest() });

    it("should multi delete correctly", function (done) {
      peopleApi.getAll()
      .then(function(res) {
        expect(res.data.length).toEqual(7);
        return peopleApi.deleteMany([{Id: 5}, {Id: 4}, {Id: 4}])
      })
      .then(function(res) {
        return peopleApi.getAll();
      })
      .then(function(res) {
        expect(res.data.length).toEqual(5);
        done();
      })
      httpBackend.flush();
    });

    it("should not let you multi delete without Id fields set", function() {
      expect(function() {peopleApi.deleteMany([{Id: 5}, {}, {Id: 3}])})
      .toThrow(new Error("Tried to do multiajax and one object didn't have a natural number as an Id property"));
    })

    it("should not let you multi put without Id fields set", function() {
      expect(function() {peopleApi.putMany([{Id: 5}, {}, {Id: 3}])})
      .toThrow(new Error("Tried to do multiajax and one object didn't have a natural number as an Id property"));
    })

    it("should multi put correctly", function(done) {
      var changed;
      peopleApi.getAll()
      .then(function(res) {
        expect(res.data.length).toEqual(7);
        res.data[3].Name = 'ASDQWE';
        res.data[6].Name = 'rsfdsf';
        changed = res.data;
        return peopleApi.putMany(res.data)
      })
      .then(function(res) {
      	return peopleApi.getAll()
      })
      .then(function(res) {
        expect(res.data).toEqual(changed);
        done();
      })
      httpBackend.flush();
    })

    it("should not allow to create a request without url", function() {
    	expect(function() { _api.requestFn({}) })
    	.toThrow(new Error("Tried to create a request without url"))
    	expect(function() { _api.requestFn() })
    	.toThrow(new Error("Tried to create a request without url"))
    })

    it("should prepend /api to api.requestFn if it wasn't specified", function() {
    	_api.requestFn({ url: 'people' })()
    	_api.requestFn({ url: '/people' })()
    	_api.requestFn({ url: '/api/people' })()
    	_api.requestFn({ url: 'api/people' })()
      httpBackend.flush();
    })
  });
});