(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformationEdit')
        .component("referenceInformationEdit", {
            templateUrl: "app/aplicacion/components/referenceInformationEdit/referenceInformationEdit.tmpl.html",
            controller: 'ReferenceInformationEditController',
            controllerAs: 'vm'
        });
})();
