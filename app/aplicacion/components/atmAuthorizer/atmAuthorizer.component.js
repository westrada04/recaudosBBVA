(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.atmAuthorizer')
        .component("atmAuthorizer", {
            templateUrl: "app/aplicacion/components/atmAuthorizer/atmAuthorizer.tmpl.html",
            controller: 'AtmAuthorizerController',
            controllerAs: 'vm'
        });
})();
