(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.recaudoProductsTaxCreateModify')
        .component("recaudoProductsTaxCreateModify", {
            templateUrl: "app/aplicacion/components/recaudoProductsTaxCreateModify/recaudoProductsTaxCreateModify.tmpl.html",
            controller: 'RecaudoProductsTaxCreateModifyController',
            controllerAs: 'vm'
        });
})();
