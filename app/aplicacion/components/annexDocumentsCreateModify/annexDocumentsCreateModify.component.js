(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.annexDocumentsCreateModify')
        .component("annexDocumentsCreateModify", {
            templateUrl: "app/aplicacion/components/annexDocumentsCreateModify/annexDocumentsCreateModify.tmpl.html",
            controller: 'AnnexDocumentsCreateModifyController',
            controllerAs: 'vm'
        });
})();
