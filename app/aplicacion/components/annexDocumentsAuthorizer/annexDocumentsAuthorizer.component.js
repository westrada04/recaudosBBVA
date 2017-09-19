(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.annexDocumentsAuthorizer')
        .component("annexDocumentsAuthorizer", {
            templateUrl: "app/aplicacion/components/annexDocumentsAuthorizer/annexDocumentsAuthorizer.tmpl.html",
            controller: 'AnnexDocumentsAuthorizerController',
            controllerAs: 'vm'
        });
})();
