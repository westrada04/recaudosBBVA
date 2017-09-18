(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGenerationCreateModify')
        .component("pinGenerationCreateModify", {
            templateUrl: "app/aplicacion/components/pinGenerationCreateModify/pinGenerationCreateModify.tmpl.html",
            controller: 'PinGenerationCreateModifyController',
            controllerAs: 'vm'
        });
})();
