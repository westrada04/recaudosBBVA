(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalDataAuthorizer')
        .component("generalDataAuthorizer", {
            templateUrl: "app/aplicacion/components/generalDataAuthorizer/generalDataAuthorizer.tmpl.html",
            controller: 'GeneralDataAuthorizerController',
            controllerAs: 'vm'
        });
})();
