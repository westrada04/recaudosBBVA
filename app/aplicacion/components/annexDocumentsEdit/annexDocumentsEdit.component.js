(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.annexDocumentsEdit')
        .component("annexDocumentsEdit", {
            templateUrl: "app/aplicacion/components/annexDocumentsEdit/annexDocumentsEdit.tmpl.html",
            controller: 'AnnexDocumentsEditController',
            controllerAs: 'vm'
        });
})();
