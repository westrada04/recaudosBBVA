(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureTypeEdit')
        .component("captureTypeEdit", {
            templateUrl: "app/aplicacion/components/captureTypeEdit/captureTypeEdit.tmpl.html",
            controller: 'CaptureTypeEditController',
            controllerAs: 'vm'
        });
})();
