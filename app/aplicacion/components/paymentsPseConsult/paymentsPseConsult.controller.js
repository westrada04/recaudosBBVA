(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseConsult')
        .controller('PaymentsPseConsultController', PaymentsPseConsultController);

    function PaymentsPseConsultController(ConsultAgreementService) {
        var vm = this;
        var request = ConsultAgreementService.getPse();
        vm.pseAgreement = request.pseAgreement;
        vm.coupon = request.coupon;
    }
})();
