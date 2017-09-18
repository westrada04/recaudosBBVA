(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseCreateModify')
        .controller('PaymentsPseCreateModifyController', PaymentsPseCreateModifyController);

    function PaymentsPseCreateModifyController(PaymentsPseCreateModifyService, toastr, GeneralDataCreateModifyControllerService, ConsultAgreementService) {
        var vm = this;

        var request = ConsultAgreementService.getPse();
        vm.pseAgreement = request.pseAgreement;
        vm.coupon = request.coupon;

        vm.save = save;

        function save() {

            var requestAgrement = GeneralDataCreateModifyControllerService.getRequestAgreement().idAgreement;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

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

            vm.myPromise = PaymentsPseCreateModifyService.createIndicatorGen(requestIndicatorPse, requestIndicatorPse.name)
                .then(function (response) {
                    return PaymentsPseCreateModifyService.createIndicatorGen(requestCouponPse, requestCouponPse.name);
                }).then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
