(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTimeConsult')
        .component("payTimeConsult", {
            templateUrl: "app/aplicacion/components/payTimeConsult/payTimeConsult.tmpl.html",
            controller: 'PayTimeConsultController',
            controllerAs: 'vm'
        });
})();
