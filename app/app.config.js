(function () {
    'use strict';

    angular
        .module('app')

        .constant('API_BACKEND',{
            url: 'https://150.250.235.70/aso-crch'
        })
    
        .constant('API_BACKEND_GT',{
            url: 'https://150.250.235.70/gt-crch/TechArchitecture/co/grantingTicket/V02'
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