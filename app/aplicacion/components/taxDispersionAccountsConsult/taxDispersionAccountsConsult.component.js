(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccountsConsult')
        .component("taxDispersionAccountsConsult", {
            templateUrl: "app/aplicacion/components/taxDispersionAccountsConsult/taxDispersionAccountsConsult.tmpl.html",
            controller: 'TaxDispersionAccountsConsultController',
            controllerAs: 'vm'
        });
})();
