(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTimeConsult')
        .controller('PayTimeConsultController', PayTimeConsultController);

    function PayTimeConsultController(ConsultAgreementService, toastr) {
        var vm = this;
        var requestPaytime = ConsultAgreementService.getPaytime();

        vm.serviceStatus = requestPaytime.serviceStatus;
        vm.dateStatus = requestPaytime.dateStatus;
        vm.facturationType = requestPaytime.facturationType;
        vm.frequencyReceipt = requestPaytime.frequencyReceipt;
        vm.posFixedReference = requestPaytime.posFixedReference;
        vm.numberDaysInvoiceBd = requestPaytime.numberDaysInvoiceBd;
        vm.maximumRetry = requestPaytime.maximumRetry;
        vm.namePaymentReference = requestPaytime.namePaymentReference;
        vm.indRetryType = requestPaytime.indRetryType;
        vm.typeIndicatorRetry = requestPaytime.typeIndicatorRetry;
        vm.partialCollectionIndicator = requestPaytime.partialCollectionIndicator;
        vm.maxChargeProducts = requestPaytime.maxChargeProducts;
        vm.accountabilityIndicator = requestPaytime.accountabilityIndicator;
        vm.indicatorCargoTCredit = requestPaytime.indicatorCargoTCredit;
        vm.maxChargeProductsDifer = requestPaytime.maxChargeProductsDifer;
        vm.serviceType = 'RC';


        vm.serviceTypes = [
            {
                nombre: 'RC',
                value: 'RC'
            }
        ];

        vm.servicesStatus = [
            {
                nombre: 'Activo',
                value: 'A'
            },
            {
                nombre: 'Inactivo',
                value: 'I'
            }
        ];

        vm.facturationTypes = [
            {
                nombre: 'Propia',
                value: 'PR'
            },
            {
                nombre: 'Ajena',
                value: 'AJ'
            }
        ];

        vm.frequencyReceipts = [
            {
                nombre: 'Diaria',
                value: 'D'
            },
            {
                nombre: 'Mensual',
                value: 'M'
            },
            {
                nombre: 'Anual',
                value: 'A'
            }
        ];

        vm.posFixedReferences = [
            {
                nombre: 'Primaria',
                value: 'PRI'
            },
            {
                nombre: 'Secundaria',
                value: 'SEC'
            }
        ];

        vm.maximumRetries = [
            {
                nombre: '1',
                value: '1'
            },
            {
                nombre: '2',
                value: '2'
            },
            {
                nombre: '3',
                value: '3'
            },
            {
                nombre: '4',
                value: '4'
            },
            {
                nombre: '5',
                value: '5'
            }
        ];

        vm.maxChargesProducts = [
            {
                nombre: '1',
                value: '1'
            },
            {
                nombre: '2',
                value: '2'
            },
            {
                nombre: '3',
                value: '3'
            }
        ];

        vm.maxChargeProductsDifers = [
            {
                nombre: '1',
                value: '1'
            },
            {
                nombre: '2',
                value: '2'
            },
            {
                nombre: '3',
                value: '3'
            },
            {
                nombre: '4',
                value: '4'
            },
            {
                nombre: '5',
                value: '5'
            },
            {
                nombre: '6',
                value: '6'
            },
            {
                nombre: '7',
                value: '7'
            },
            {
                nombre: '8',
                value: '8'
            },
            {
                nombre: '9',
                value: '9'
            },
            {
                nombre: '10',
                value: '10'
            },
            {
                nombre: '11',
                value: '11'
            },
            {
                nombre: '12',
                value: '12'
            },
            {
                nombre: '13',
                value: '13'
            },
            {
                nombre: '14',
                value: '14'
            },
            {
                nombre: '15',
                value: '15'
            },
            {
                nombre: '16',
                value: '16'
            },
            {
                nombre: '17',
                value: '17'
            },
            {
                nombre: '18',
                value: '18'
            },
            {
                nombre: '19',
                value: '19'
            },
            {
                nombre: '20',
                value: '20'
            },
            {
                nombre: '21',
                value: '21'
            },
            {
                nombre: '22',
                value: '22'
            },
            {
                nombre: '23',
                value: '23'
            },
            {
                nombre: '24',
                value: '24'
            },
            {
                nombre: '25',
                value: '25'
            },
            {
                nombre: '26',
                value: '26'
            },
            {
                nombre: '27',
                value: '27'
            },
            {
                nombre: '28',
                value: '28'
            },
            {
                nombre: '29',
                value: '29'
            },
            {
                nombre: '30',
                value: '30'
            },
            {
                nombre: '31',
                value: '31'
            },
            {
                nombre: '32',
                value: '32'
            },
            {
                nombre: '33',
                value: '33'
            },
            {
                nombre: '34',
                value: '34'
            },
            {
                nombre: '35',
                value: '35'
            },
            {
                nombre: '36',
                value: '36'
            }
        ];


    }
})();
