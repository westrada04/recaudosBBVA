(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPse')
        .controller('PaymentsPseController', PaymentsPseController);

    function PaymentsPseController(PaymentsPseService, toastr, GeneralDataService) {
        var vm = this;
        vm.save = save;
        vm.coupon = false;
        vm.pseAgreement = false;

        function save() {

            var requestAgrement = GeneralDataService.getRequestAgreement().idAgreement;

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

            vm.myPromise = PaymentsPseService.createIndicatorGen(requestIndicatorPse, requestIndicatorPse.name)
                .then(function (response) {
                    return PaymentsPseService.createIndicatorGen(requestCouponPse, requestCouponPse.name);
                }).then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
