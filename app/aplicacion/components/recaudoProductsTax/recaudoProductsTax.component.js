(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.recaudoProductsTax')
        .component("recaudoProductsTax", {
            templateUrl: "app/aplicacion/components/recaudoProductsTax/recaudoProductsTax.tmpl.html",
            controller: 'RecaudoProductsTaxController',
            controllerAs: 'vm'
        });
})();
