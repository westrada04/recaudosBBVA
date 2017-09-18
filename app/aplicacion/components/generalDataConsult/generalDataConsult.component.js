(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalDataConsult')
        .component("generalDataConsult", {
            templateUrl: "app/aplicacion/components/generalDataConsult/generalDataConsult.tmpl.html",
            controller: 'GeneralDataConsultController',
            controllerAs: 'vm'
        });
})();
