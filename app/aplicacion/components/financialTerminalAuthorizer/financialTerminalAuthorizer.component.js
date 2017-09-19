(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalAuthorizer')
        .component("financialTerminalAuthorizer", {
            templateUrl: "app/aplicacion/components/financialTerminalAuthorizer/financialTerminalAuthorizer.tmpl.html",
            controller: 'FinancialTerminalAuthorizerController',
            controllerAs: 'vm'
        });
})();
