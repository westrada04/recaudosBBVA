(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.annexDocumentsConsult')
        .component("annexDocumentsConsult", {
            templateUrl: "app/aplicacion/components/annexDocumentsConsult/annexDocumentsConsult.tmpl.html",
            controller: 'AnnexDocumentsConsultController',
            controllerAs: 'vm'
        });
})();
