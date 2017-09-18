(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParameters')
        .component("specialTaxParameters", {
            templateUrl: "app/aplicacion/components/specialTaxParameters/specialTaxParameters.tmpl.html",
            controller: 'SpecialTaxParametersController',
            controllerAs: 'vm'
        });
})();
