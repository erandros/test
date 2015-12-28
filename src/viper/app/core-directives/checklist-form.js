var _scope;
(function () {

    angular
    .module('viper')
    .directive('vpChecklistForm', ['$injector', '$parse', 'razorParams', function ($injector, $parse, razorParams) {
        return {
            templateUrl: '/templates/checklist-form.html',
            link: function (scope, element, attrs, ctrl) {
                _scope = scope;
                var split = attrs["vpGetList"].split('.');
                var getList = $injector.get(split[0])[split[1]];
                split = attrs["vpGetSelected"].split('.');
                var getSelected = $injector.get(split[0])[split[1]];
                split = attrs["vpPost"].split('.');
                var post = $injector.get(split[0])[split[1]];
                refresh();
                function refresh() {
                    getList()
                    .then(function (res) {
                        scope.items = res.data;
                    })
                    getSelected({ Id: razorParams.Id })
                    .then(function(res) {
                        scope.selected = res.data.roles;
                    })
                }
                scope.save = function () {
                    return post({ Id: razorParams.Id, roles: scope.selected });
                }
                scope.comparator = function (obj1, obj2) {
                    return obj1.Id == obj2.Id;
                }
            }
        };
    }]);
})();