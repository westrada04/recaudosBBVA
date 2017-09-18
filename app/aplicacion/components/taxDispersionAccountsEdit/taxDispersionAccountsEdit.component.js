(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccountsEdit')
        .component("taxDispersionAccountsEdit", {
            templateUrl: "app/aplicacion/components/taxDispersionAccountsEdit/taxDispersionAccountsEdit.tmpl.html",
            controller: 'TaxDispersionAccountsEditController',
            controllerAs: 'vm'
        });
})();
