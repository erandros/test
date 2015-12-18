(function () {

    angular
    .module('viper')
    .directive('vpCheckboxList', ['$injector', '$parse', function ($injector, $parse) {
        return {
            require: '^vpForm',
            templateUrl: '/templates/vp-checkbox-list.html',
            link: function (scope, element, attrs, ctrl) {
                scope.api = $injector.get(scope.field.params[0]);
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
                })
            }
        };
    }]);
})();