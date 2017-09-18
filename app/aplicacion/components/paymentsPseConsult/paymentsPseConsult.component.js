(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseConsult')
        .component("paymentsPseConsult", {
            templateUrl: "app/aplicacion/components/paymentsPseConsult/paymentsPseConsult.tmpl.html",
            controller: 'PaymentsPseConsultController',
            controllerAs: 'vm'
        });
})();
