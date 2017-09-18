(function () {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);

    function permissionRun( PermPermissionStore, PermRoleStore,PermissionService, UserService) {
        

        PermPermissionStore.defineManyPermissions(PermissionService.getPermissions(), function (permissionName) {
            return UserService.hasPermission(permissionName);
        });

        PermRoleStore.defineManyRoles(PermissionService.getRoles());
    }
})();
