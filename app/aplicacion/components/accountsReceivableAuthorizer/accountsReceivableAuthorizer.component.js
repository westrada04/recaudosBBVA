(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivableAuthorizer')
        .component("accountsReceivableAuthorizer", {
            templateUrl: "app/aplicacion/components/accountsReceivableAuthorizer/accountsReceivableAuthorizer.tmpl.html",
            controller: 'AccountsReceivableAuthorizerController',
            controllerAs: 'vm'
        });
})();
