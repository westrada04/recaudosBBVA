(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccountsAuthorizer')
        .component("taxDispersionAccountsAuthorizer", {
            templateUrl: "app/aplicacion/components/taxDispersionAccountsAuthorizer/taxDispersionAccountsAuthorizer.tmpl.html",
            controller: 'TaxDispersionAccountsAuthorizerController',
            controllerAs: 'vm'
        });
})();
