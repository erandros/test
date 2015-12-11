﻿(function () {
    'use strict';

    angular
    .module('viper')
    .directive('vpForm', ['$modal', '$injector', '$location', 'utils', function ($modal, $injector, $location, utils) {
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
        }
        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/vp-form.html',
            controller: ['$scope', 'razorParams', ViperForm],
            require: 'vpForm',
        };
        function ViperForm($scope, razorParams) {
            var vm = this;
            this.fill = function () {
                return $scope.api.get({ Id: razorParams.Id })
                .then(function (res) {
                    $scope.form = res.data;
                    console.log(res);
                })
            }
        }
    }])
})();