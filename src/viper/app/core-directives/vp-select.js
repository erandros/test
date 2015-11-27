(function () {

    angular
    .module('viper')
    .directive('vpSelect', function () {
        return {
            require: '^vpTable',
            template: '<div class="vp-box"><div class="vp-check"></div></div>',
            scope: {
                row: '=row'
            },
            link: function (scope, element, attr, ctrl) {
                element.bind('click', function (evt) {
                    scope.$apply(function () {
                        ctrl.select(scope.row, 'multiple');
                    });
                });
                scope.$watch('row.isSelected', function (newValue, oldValue) {
                    if (newValue === true) {
                        ctrl.selectRow(scope.row);
                        element.children('.vp-box').addClass('checked');
                        element.parent().addClass('st-selected');
                    } else {
                        ctrl.deselectRow(scope.row);
                        element.children('.vp-box').removeClass('checked');
                        element.parent().removeClass('st-selected');
                    }
                });
            }
        };
    });
})();