(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivableEdit')
        .component("accountsReceivableEdit", {
            templateUrl: "app/aplicacion/components/accountsReceivableEdit/accountsReceivableEdit.tmpl.html",
            controller: 'AccountsReceivableEditController',
            controllerAs: 'vm'
        });
})();
