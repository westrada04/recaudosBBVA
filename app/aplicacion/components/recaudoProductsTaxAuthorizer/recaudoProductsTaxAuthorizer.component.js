(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.recaudoProductsTaxAuthorizer')
        .component("recaudoProductsTaxAuthorizer", {
            templateUrl: "app/aplicacion/components/recaudoProductsTaxAuthorizer/recaudoProductsTaxAuthorizer.tmpl.html",
            controller: 'RecaudoProductsTaxAuthorizerController',
            controllerAs: 'vm'
        });
})();
