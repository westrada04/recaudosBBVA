(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.atm')
        .component("atm", {
            templateUrl: "app/aplicacion/components/atm/atm.tmpl.html",
            controller: 'AtmController',
            controllerAs: 'vm'
        });
})();
