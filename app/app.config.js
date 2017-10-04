(function () {
    'use strict';

    angular
        .module('app')

        .constant('API_BACKEND',{
            url: 'http://172.17.88.171:7700'
        })
    
        .constant('API_BACKEND_GT',{
            url: 'http://172.17.88.171:7500/TechArchitecture/co/grantingTicket/V02'
        })
        
        .value('cgBusyDefaults',{
            message: "Por favor espera ...",
            minDuration: 700
        })
        
        .config(['$sessionStorageProvider',
            function ($localStorageProvider) {
                $localStorageProvider.setKeyPrefix('');
        }])
        
        .config(function ($permissionProvider) {
            $permissionProvider.suppressUndefinedPermissionWarning(true);
        })
        .config(function(toastrConfig)  {
            angular.extend(toastrConfig, {
                allowHtml: true,
                closeButton: true
            });
        })
    
})();
