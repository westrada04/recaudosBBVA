(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.recaudoProductsTaxConsult')
        .component("recaudoProductsTaxConsult", {
            templateUrl: "app/aplicacion/components/recaudoProductsTaxConsult/recaudoProductsTaxConsult.tmpl.html",
            controller: 'RecaudoProductsTaxConsultController',
            controllerAs: 'vm'
        });
})();
