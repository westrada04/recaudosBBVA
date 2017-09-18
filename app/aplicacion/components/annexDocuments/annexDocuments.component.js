(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.annexDocuments')
        .component("annexDocuments", {
            templateUrl: "app/aplicacion/components/annexDocuments/annexDocuments.tmpl.html",
            controller: 'AnnexDocumentsController',
            controllerAs: 'vm'
        });
})();
