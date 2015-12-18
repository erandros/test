(function () {
    'use strict';

    angular
    .module('viper')
    .factory('groups', ['api', 'utils', function (api, utils) {
        var groupsApi = api.create('/groups');
        groupsApi.setRoles = function (data) {
            if (!data.roles) throw new Error("roles property should be an array, but it wasn't thruthy");
            if (!angular.isArray(data.roles)) throw new Error("roles property should be an array, it was something else")
            data.roles = data.roles.map(function (role) {
                return role.Name;
            })
            return api.request({
                url: '/groups/:Id/set-group-roles',
                method: 'post'
            }, {
                dataField: 'roles'
            }, data);
        }
        groupsApi.getRoles = function (data) {
            return api.build({ url: '/groups/:Id/roles' })(data)
            .then(function (res) {
                res.data = {
                    roles: res.data.map(function (role) {
                        return {
                            Name: role.Name,
                            Id: role.Id
                        }
                    })
                }
                return res;
            });
        }
        return groupsApi;
    }])
})();