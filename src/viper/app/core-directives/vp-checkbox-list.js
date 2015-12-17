var _scope;
(function () {

    angular
    .module('viper')
    .directive('vpCheckboxList', ['$injector', '$parse', function ($injector, $parse) {
        return {
            require: '^vpForm',
            templateUrl: '/templates/vp-checkbox-list.html',
            link: function (scope, element, attr, ctrl) {
                _scope = scope;
                scope.api = $injector.get(scope.field.params[0]);
                $parse;
                var _comparator = scope[scope.field.params[1]];
                scope.comparator = function (obj1, obj2) {
                    if (angular.isFunction(_comparator)) return _comparator(obj1, obj2);
                    else return obj1[_comparator] == obj2[_comparator];
                }
                scope.api.getAll()
                .then(function (res) {
                    scope.checkboxes = res.data;
                })
            }
        };
    }]);
})();