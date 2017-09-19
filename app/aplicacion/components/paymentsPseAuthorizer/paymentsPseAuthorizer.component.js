(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseAuthorizer')
        .component("paymentsPseAuthorizer", {
            templateUrl: "app/aplicacion/components/paymentsPseAuthorizer/paymentsPseAuthorizer.tmpl.html",
            controller: 'PaymentsPseAuthorizerController',
            controllerAs: 'vm'
        });
})();
