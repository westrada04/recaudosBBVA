(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseEdit')
        .component("paymentsPseEdit", {
            templateUrl: "app/aplicacion/components/paymentsPseEdit/paymentsPseEdit.tmpl.html",
            controller: 'PaymentsPseEditController',
            controllerAs: 'vm'
        });
})();
