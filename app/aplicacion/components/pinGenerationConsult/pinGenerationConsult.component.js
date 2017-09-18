(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGenerationConsult')
        .component("pinGenerationConsult", {
            templateUrl: "app/aplicacion/components/pinGenerationConsult/pinGenerationConsult.tmpl.html",
            controller: 'PinGenerationConsultController',
            controllerAs: 'vm'
        });
})();
