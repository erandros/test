(function () {
    'use strict'

    angular
    .module('viper')
    .directive('vpEditForm', [function () {
        function link(scope, element, attrs, ctrl) {
            scope.attrs = attrs;
        }
        return {
            link: link,
            templateUrl: '/templates/edit-form.html'
        }
    }])
    .controller('DeleteModalCtrl', ['$uibModalInstance', '$scope', 'length',
        function ($uibModalInstance, $scope, length) {
            var vm = this;
            $scope.length = length;
        }
    ])
})();