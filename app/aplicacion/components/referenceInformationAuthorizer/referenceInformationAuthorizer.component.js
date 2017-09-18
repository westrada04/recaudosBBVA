(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformationAuthorizer')
        .component("referenceInformationAuthorizer", {
            templateUrl: "app/aplicacion/components/referenceInformationAuthorizer/referenceInformationAuthorizer.tmpl.html",
            controller: 'ReferenceInformationAuthorizerController',
            controllerAs: 'vm'
        });
})();
