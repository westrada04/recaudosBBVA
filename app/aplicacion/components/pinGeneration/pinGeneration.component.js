(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGeneration')
        .component("pinGeneration", {
            templateUrl: "app/aplicacion/components/pinGeneration/pinGeneration.tmpl.html",
            controller: 'PinGenerationController',
            controllerAs: 'vm'
        });
})();
