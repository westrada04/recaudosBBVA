(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformation')
        .component("referenceInformation", {
            templateUrl: "app/aplicacion/components/referenceInformation/referenceInformation.tmpl.html",
            controller: 'ReferenceInformationController',
            controllerAs: 'vm'
        });
})();
