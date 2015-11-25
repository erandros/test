(function () {

    angular
    .module('viper')
    .directive('vpSelect', function () {
        return {
            require: '^stTable',
            template: '<div class="vp-box"><div class="vp-check"></div></div>',
            scope: {
                row: '=vpSelect'
            },
            link: function (scope, element, attr, ctrl) {
                element.bind('click', function (evt) {
                    scope.$apply(function () {
                        ctrl.select(scope.row, 'multiple');
                    });
                });
                scope.$watch('row.isSelected', function (newValue, oldValue) {
                    if (newValue === true) {
                        element.children('.vp-box').addClass('checked');
                        element.parent().addClass('st-selected');
                    } else {
                        element.children('.vp-box').removeClass('checked');
                        element.parent().removeClass('st-selected');
                    }
                });
            }
        };
    });
})();