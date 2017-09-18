(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGenerationAuthorizer')
        .component("pinGenerationAuthorizer", {
            templateUrl: "app/aplicacion/components/pinGenerationAuthorizer/pinGenerationAuthorizer.tmpl.html",
            controller: 'PinGenerationAuthorizerController',
            controllerAs: 'vm'
        });
})();
