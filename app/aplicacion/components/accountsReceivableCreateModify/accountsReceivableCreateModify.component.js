(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivableCreateModify')
        .component("accountsReceivableCreateModify", {
            templateUrl: "app/aplicacion/components/accountsReceivableCreateModify/accountsReceivableCreateModify.tmpl.html",
            controller: 'AccountsReceivableCreateModifyController',
            controllerAs: 'vm'
        });
})();
