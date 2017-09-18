(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminal')
        .component("financialTerminal", {
            templateUrl: "app/aplicacion/components/financialTerminal/financialTerminal.tmpl.html",
            controller: 'FinancialTerminalController',
            controllerAs: 'vm'
        });
})();
