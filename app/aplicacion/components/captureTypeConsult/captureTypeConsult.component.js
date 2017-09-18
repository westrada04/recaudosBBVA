(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureTypeConsult')
        .component("captureTypeConsult", {
            templateUrl: "app/aplicacion/components/captureTypeConsult/captureTypeConsult.tmpl.html",
            controller: 'CaptureTypeConsultController',
            controllerAs: 'vm'
        });
})();
