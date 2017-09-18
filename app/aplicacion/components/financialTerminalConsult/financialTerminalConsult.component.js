(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalConsult')
        .component("financialTerminalConsult", {
            templateUrl: "app/aplicacion/components/financialTerminalConsult/financialTerminalConsult.tmpl.html",
            controller: 'FinancialTerminalConsultController',
            controllerAs: 'vm'
        });
})();
