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
                    var checked = !element.children().hasClass('checked');
                    if (checked) {
                        ctrl.selectRow(scope.row);
                        element.children('.vp-box').addClass('checked');
                    }
                    else {
                        ctrl.deselectRow(scope.row);
                        element.children('.vp-box').removeClass('checked');
                    }
                    scope.$apply();
                });
            }
        };
    });
})();