(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureTypeAuthorizer')
        .component("captureTypeAuthorizer", {
            templateUrl: "app/aplicacion/components/captureTypeAuthorizer/captureTypeAuthorizer.tmpl.html",
            controller: 'CaptureTypeAuthorizerController',
            controllerAs: 'vm'
        });
})();
