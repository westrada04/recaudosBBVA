(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseCreateModify')
        .component("paymentsPseCreateModify", {
            templateUrl: "app/aplicacion/components/paymentsPseCreateModify/paymentsPseCreateModify.tmpl.html",
            controller: 'PaymentsPseCreateModifyController',
            controllerAs: 'vm'
        });
})();
