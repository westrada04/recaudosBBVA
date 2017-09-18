(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalCreateModify')
        .component("financialTerminalCreateModify", {
            templateUrl: "app/aplicacion/components/financialTerminalCreateModify/financialTerminalCreateModify.tmpl.html",
            controller: 'FinancialTerminalCreateModifyController',
            controllerAs: 'vm'
        });
})();
