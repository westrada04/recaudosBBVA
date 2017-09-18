(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformationConsult')
        .component("referenceInformationConsult", {
            templateUrl: "app/aplicacion/components/referenceInformationConsult/referenceInformationConsult.tmpl.html",
            controller: 'ReferenceInformationConsultController',
            controllerAs: 'vm'
        });
})();
