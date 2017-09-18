(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersEdit')
        .component("specialTaxParametersEdit", {
            templateUrl: "app/aplicacion/components/specialTaxParametersEdit/specialTaxParametersEdit.tmpl.html",
            controller: 'SpecialTaxParametersEditController',
            controllerAs: 'vm'
        });
})();
