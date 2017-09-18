(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalDataCreateModify')
        .component("generalDataCreateModify", {
            templateUrl: "app/aplicacion/components/generalDataCreateModify/generalDataCreateModify.tmpl.html",
            controller: 'GeneralDataCreateModifyController',
            controllerAs: 'vm'
        });
})();
