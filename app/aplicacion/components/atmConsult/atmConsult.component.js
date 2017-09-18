(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.atmConsult')
        .component("atmConsult", {
            templateUrl: "app/aplicacion/components/atmConsult/atmConsult.tmpl.html",
            controller: 'AtmConsultController',
            controllerAs: 'vm'
        });
})();
