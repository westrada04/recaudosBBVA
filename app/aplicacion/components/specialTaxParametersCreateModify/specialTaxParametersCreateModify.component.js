(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersCreateModify')
        .component("specialTaxParametersCreateModify", {
            templateUrl: "app/aplicacion/components/specialTaxParametersCreateModify/specialTaxParametersCreateModify.tmpl.html",
            controller: 'SpecialTaxParametersCreateModifyController',
            controllerAs: 'vm'
        });
})();
