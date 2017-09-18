(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersAuthorizer')
        .component("specialTaxParametersAuthorizer", {
            templateUrl: "app/aplicacion/components/specialTaxParametersAuthorizer/specialTaxParametersAuthorizer.tmpl.html",
            controller: 'SpecialTaxParametersAuthorizerController',
            controllerAs: 'vm'
        });
})();
