(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.recaudoProductsTaxEdit')
        .component("recaudoProductsTaxEdit", {
            templateUrl: "app/aplicacion/components/recaudoProductsTaxEdit/recaudoProductsTaxEdit.tmpl.html",
            controller: 'RecaudoProductsTaxEditController',
            controllerAs: 'vm'
        });
})();
