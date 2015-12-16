(function () {

    angular
    .module('viper')
    .directive('vpCheckboxList', function () {
        return {
            require: '^vpForm',
            templateUrl: '/templates/vp-checkbox-list.html',
            link: function (scope, element, attr, ctrl) {
                scope.api = $injector.get(attrs['api']);
                element.bind('click', function (evt) {
                });
            }
        };
    });
})();