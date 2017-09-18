(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseEdit')
        .controller('PaymentsPseEditController', PaymentsPseEditController);

    function PaymentsPseEditController(PaymentsPseEditService, toastr, GeneralDataEditService, ConsultAgreementService) {
        var vm = this;

        var request = ConsultAgreementService.getPse();
        vm.pseAgreement = request.pseAgreement;
        vm.coupon = request.coupon;

        //vm.coupon = false;
        //vm.pseAgreement = false;
        vm.save = save;

        function save() {

            // Convenio PSE
            var requestIndicatorPse = {
                "name": "INDICATOR_PSE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
            	}],
                "value": [{
                    id: vm.pseAgreement ? 'S' : 'N',
                    name: vm.pseAgreement ? 'S' : 'N'
            	}]
            };
            // Cupón
            var requestCouponPse = {
                "name": "COUPON_PSE",
                "isActive": vm.coupon,
                "limits": [{
                    start: "",
                    end: ""
            	}],
                "value": [{
                    id: "",
                    name: ""
            	}]
            };

            vm.myPromise = PaymentsPseEditService.createIndicatorGen(requestIndicatorPse, requestIndicatorPse.name)
                .then(function (response) {
                    return PaymentsPseEditService.createIndicatorGen(requestCouponPse, requestCouponPse.name);
                }).then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
