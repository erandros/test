(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpForm', ['$modal', '$injector', '$location', 'utils', 'notify',
        function ($modal, $injector, $location, utils, notify) {
        function link(scope, element, attrs, ctrl) {
            var type = attrs['type'];
            scope.fields = utils.typify(attrs["fields"]);
            if (!attrs.hasOwnProperty('api')) {
                attrs['api'] = type.pluralize();
            }
            if (!attrs.hasOwnProperty('title')) {
                attrs['title'] = type.capitalizeFirstLetter().pluralize();
            }
            scope.api = $injector.get(attrs['api']);
            ctrl.fill();
            scope.type = attrs["type"];
            scope.title = attrs["title"];
            scope.save = function (form) {
                scope.api.put(form)
                .then(function (res) {
                    notify.success("Saved");
                })
            }
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/form.html',
            controller: ['$scope', 'razorParams', ViperForm],
            require: 'vpForm',
        };
        function ViperForm($scope, razorParams) {
            var vm = this;
            this.fill = function () {
                $scope.ready = false;
                return $scope.api.get({ Id: razorParams.Id })
                .then(function (res) {
                    $scope.Id = res.data.Id;
                    $scope.ready = true;
                    $scope.form = res.data;
                    console.log(res);
                })
            }
        }
    }])
})();