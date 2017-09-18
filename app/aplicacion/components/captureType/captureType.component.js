(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureType')
        .component("captureType", {
            templateUrl: "app/aplicacion/components/captureType/captureType.tmpl.html",
            controller: 'CaptureTypeController',
            controllerAs: 'vm'
        });
})();
