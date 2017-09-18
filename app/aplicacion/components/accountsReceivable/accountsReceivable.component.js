(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivable')
        .component("accountsReceivable", {
            templateUrl: "app/aplicacion/components/accountsReceivable/accountsReceivable.tmpl.html",
            controller: 'AccountsReceivableController',
            controllerAs: 'vm'
        });
})();
