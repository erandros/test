var _scope;
(function () {

    angular
    .module('viper')
    .directive('vpChecklistForm', ['$injector', '$parse', function ($injector, $parse) {
        return {
            templateUrl: '/templates/vp-checklist-form.html',
            link: function (scope, element, attrs, ctrl) {
                _scope = scope;
                scope.items = [{ Name: 'hi', Id: 1 }, { Name: 'hello', Id: 2 }, { Name: 'hi there', Id: 3 }]
                scope.model = [];
                scope.map = function (item) {
                    return item;
                }
                scope.comparator = function (obj1, obj2) {
                    return obj1.Id == obj2.Id;
                }
                /*scope.api = $injector.get(scope.field.params[0]);
                $parse;
                var _comparator = scope.field.params[1];
                var _comparatorFn = scope[_comparator];
                scope.comparator = function (obj1, obj2) {
                    if (angular.isFunction(_comparatorFn)) return _comparatorFn(obj1, obj2);
                    else return obj1[_comparator] == obj2[_comparator];
                }
                var _map = scope.field.params[2];
                var _mapFn = scope[_map];
                scope.map = function (obj) {
                    if (angular.isFunction(_mapFn)) return _mapFn(obj);
                    else return obj[_map];
                }
                scope.api.getAll()
                .then(function (res) {
                    scope.items = res.data;
                })*/
            }
        };
    }]);
})();