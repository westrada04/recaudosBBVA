(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTime')
        .controller('PayTimeController', PayTimeController);

    function PayTimeController(PayTimeService, GeneralDataService, toastr) {
        var vm = this;
        vm.save = save;
        vm.serviceType ='RC';

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

        function save() {

            var requestAgrement = GeneralDataService.getRequestAgreement().idAgreement;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            // Todas las Oficinas
            var requestValidationBD = {
                "name": "VALIDATION_OF_DATA_B",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };
            // No. Días Factura BD
            var requesNumbers_Billing_Day = {
                "name": "NUMBERS_BILLING_DAY",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.numberDaysInvoiceBd,
                    name: vm.numberDaysInvoiceBd
                }]
            };

            // Estado del Servicio
            var requestStateService = {
                "name": "STATE_SERVICE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.serviceStatus,
                    name: vm.serviceStatus
                }]
            };
            // fecha Estado del Servicio
            var requestStateDateService = {
                "name": "STATE_DATE_SERVICE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.dateStatus,
                    name: vm.dateStatus
                }]
            };
            // Ubic. Ref Fija
            var requestReference_Fixed = {
                "name": "REFERENCE_FIXED",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.posFixedReference,
                    name: vm.posFixedReference
                }]
            };
            // Tipo de Servicio
            var requestBilling_Type = {
                "name": "BILLING_TYPE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.serviceType,
                    name: vm.serviceType
                }]
            };
            // Ind. Tipo Reintento
            var requestRetries_Type = {
                "name": "RETRIES_TYPE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.typeIndicatorRetry ? "D" : "N",
                    name: vm.typeIndicatorRetry ? "D" : "N"
                }]
            };
            // Max Reintentos
            var requestMaximum_Num_Retri = {
                "name": "MAXIMUM_NUMBER_RETRI",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.maximumRetry,
                    name: vm.maximumRetry
                }]
            };
            // Nombre de Referencia Pago
            var requestName_Ref = {
                "name": "NAME_REFERENCE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.namePaymentReference,
                    name: vm.namePaymentReference
                }]
            };
            // indicador valida fecha
            var requestValidate_Date = {
                "name": "VALIDATE_DETAIL_DATE",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.serviceStatus,
                    name: vm.serviceStatus
                }]
            };
            // Ind. Cobro Vencido
            var requestOverdue_Payment = {
                "name": "OVERDUE_PAYMENT",
                "isActive": vm.indRetryType,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };
            // Indicador Cobro Parcial
            var requestPartial_Payment = {
                "name": "PARTIAL_PAYMENT",
                "isActive": vm.partialCollectionIndicator,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };
            // No. Max Asuntos Cargo
            var requestMaximun_Num_Prod = {
                "name": "MAXIMUM_NUMBER_PRODU",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.maxChargeProducts,
                    name: vm.maxChargeProducts
                }]
            };
            // Indicador Cargo Cuentas
            var requestLoad_Account = {
                "name": "LOAD_ACCOUNT",
                "isActive": vm.accountabilityIndicator,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };
            // Indicador Cargo T Crédito
            var requestEnroll_Credit_Tarj = {
                "name": "ENROLL_CREDIT_TARJ",
                "isActive": vm.indicatorCargoTCredit,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };
            // No. Cuotas Max Difer
            var requestMaximun_Num_Insta = {
                "name": "MAXIMUM_NUMBER_INSTA",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.maxChargeProductsDifer,
                    name: vm.maxChargeProductsDifer
                }]
            };


            var myPromise = PayTimeService.createIndicatorGeneral(requestValidationBD, requestValidationBD.name)
                .then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requesNumbers_Billing_Day, requesNumbers_Billing_Day.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestStateService, requestStateService.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestStateDateService, requestStateDateService.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestReference_Fixed, requestReference_Fixed.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestBilling_Type, requestBilling_Type.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestRetries_Type, requestRetries_Type.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestMaximum_Num_Retri, requestMaximum_Num_Retri.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestName_Ref, requestName_Ref.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestValidate_Date, requestValidate_Date.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestOverdue_Payment, requestOverdue_Payment.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestPartial_Payment, requestPartial_Payment.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestMaximun_Num_Prod, requestMaximun_Num_Prod.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestLoad_Account, requestLoad_Account.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestEnroll_Credit_Tarj, requestEnroll_Credit_Tarj.name);
                }).then(function (response) {
                    return PayTimeService.createIndicatorGeneral(requestMaximun_Num_Insta, requestMaximun_Num_Insta.name);
                }).then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
