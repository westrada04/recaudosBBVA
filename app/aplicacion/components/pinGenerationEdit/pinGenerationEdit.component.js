(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGenerationEdit')
        .component("pinGenerationEdit", {
            templateUrl: "app/aplicacion/components/pinGenerationEdit/pinGenerationEdit.tmpl.html",
            controller: 'PinGenerationEditController',
            controllerAs: 'vm'
        });
})();
