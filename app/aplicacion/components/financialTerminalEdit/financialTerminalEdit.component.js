(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalEdit')
        .component("financialTerminalEdit", {
            templateUrl: "app/aplicacion/components/financialTerminalEdit/financialTerminalEdit.tmpl.html",
            controller: 'FinancialTerminalEditController',
            controllerAs: 'vm'
        });
})();
