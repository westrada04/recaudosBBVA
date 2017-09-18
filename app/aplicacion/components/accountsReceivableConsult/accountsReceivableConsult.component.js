(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivableConsult')
        .component("accountsReceivableConsult", {
            templateUrl: "app/aplicacion/components/accountsReceivableConsult/accountsReceivableConsult.tmpl.html",
            controller: 'AccountsReceivableConsultController',
            controllerAs: 'vm'
        });
})();
