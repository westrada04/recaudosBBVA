(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccounts')
        .component("taxDispersionAccounts", {
            templateUrl: "app/aplicacion/components/taxDispersionAccounts/taxDispersionAccounts.tmpl.html",
            controller: 'TaxDispersionAccountsController',
            controllerAs: 'vm'
        });
})();
