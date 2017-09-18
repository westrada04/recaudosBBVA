(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPse')
        .component("paymentsPse", {
            templateUrl: "app/aplicacion/components/paymentsPse/paymentsPse.tmpl.html",
            controller: 'PaymentsPseController',
            controllerAs: 'vm'
        });
})();
