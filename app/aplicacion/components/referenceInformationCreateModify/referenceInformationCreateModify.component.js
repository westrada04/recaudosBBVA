(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformationCreateModify')
        .component("referenceInformationCreateModify", {
            templateUrl: "app/aplicacion/components/referenceInformationCreateModify/referenceInformationCreateModify.tmpl.html",
            controller: 'ReferenceInformationCreateModifyController',
            controllerAs: 'vm'
        });
})();
