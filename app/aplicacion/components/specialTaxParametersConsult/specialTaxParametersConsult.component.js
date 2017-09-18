(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersConsult')
        .component("specialTaxParametersConsult", {
            templateUrl: "app/aplicacion/components/specialTaxParametersConsult/specialTaxParametersConsult.tmpl.html",
            controller: 'SpecialTaxParametersConsultController',
            controllerAs: 'vm'
        });
})();
