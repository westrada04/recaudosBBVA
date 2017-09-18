(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureTypeCreateModify')
        .component("captureTypeCreateModify", {
            templateUrl: "app/aplicacion/components/captureTypeCreateModify/captureTypeCreateModify.tmpl.html",
            controller: 'CaptureTypeCreateModifyController',
            controllerAs: 'vm'
        });
})();
