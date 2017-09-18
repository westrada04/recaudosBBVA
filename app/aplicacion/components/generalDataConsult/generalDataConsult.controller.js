(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalDataConsult')
        .controller('GeneralDataConsultController', GeneralDataConsultController);

    function GeneralDataConsultController(ConsultAgreementService, CreateAgreementService) {
        var vm = this;

        var request = ConsultAgreementService.getGeneralData();
        vm.typeRequest = ConsultAgreementService.gettypeRequest();

        vm.user = CreateAgreementService.getUser();
        vm.manager = vm.user.nombres + ' ' + vm.user.apellidos;
        vm.managerEmail = request.managerEmail;
        vm.startTime = new Date(1970, 0, 1, 3, 0, 1);
        vm.finalHour = new Date(1970, 0, 1, 3, 1, 1);

        vm.stateVer = request.stateVer;
        vm.identificationType = request.identificationType;
        vm.identificationNumber = request.identificationNumber;
        vm.ver = request.ver;
        vm.accountType = request.accountType;
        vm.accountNumber = request.accountNumber;
        vm.typeAgreement = request.typeAgreement;
        vm.classAgreement = request.classAgreement;
        vm.agreementNumber = request.agreementNumber;
        vm.agreementName = request.agreementName;
        vm.alternateCompany = request.alternateCompany;
        vm.codeAlternateCompany = request.codeAlternateCompany;
        vm.classAlternateCompany = request.classAlternateCompany;

        vm.description = request.description;
        vm.agreementDescription = request.description;
        vm.expirationDate = request.expirationDate;
        vm.waitingAccountNumber = request.waitingAccountNumber;
        vm.isTaxAndAdditional = request.isTaxAndAdditional;
        vm.tax0044 = request.tax0044;
        vm.stateContract = request.stateContract;
        vm.paymentMethodsSelected = request.paymentMethodsSelected;
        vm.subscriptionFormat = request.subscriptionFormat;
        vm.massiveActive = request.massiveActive;
        vm.inhouse = request.inhouse;
        vm.multilote = request.multilote;
        vm.consecutive = request.consecutive;
        vm.documentTraffic = request.documentTraffic;
        vm.ucw = request.ucw;
        vm.ucwCode = request.ucwCode;
        vm.statusSubscriptionFormat = request.statusSubscriptionFormat;
        vm.statusUcw = request.statusUcw;
        
        if (vm.statusSubscriptionFormat && vm.typeRequest == 'I') {
            vm.isTaxAndAdditional = true;
        } else {
            vm.isTaxAndAdditional = false;
        }

        if (vm.typeRequest == 'R') {
            vm.isCollection = true;
            vm.identificationTypes = [
                {
                    nombre: "Cédula",
                    value: "01"
                },
                {
                    nombre: "Cédula de Extranjería",
                    value: "02"
                },
                {
                    nombre: "NIT",
                    value: "03"
                }
            ];

            vm.accountTypes = [
                {
                    nombre: "Cuenta de Ahorros",
                    value: "AH"
                },
                {
                    nombre: "Cuenta Corriente",
                    value: "CC"
                },
                {
                    nombre: "Crédito Líquido",
                    value: "CL"
                }
            ];

            vm.typeAgreements = [
                {
                    nombre: "Recaudo Nacional",
                    value: "001"
                },
                {
                    nombre: "Servicios Públicos",
                    value: "002"
                },
                {
                    nombre: "Impuestos Distritales",
                    value: "003"
                }
            ];

            vm.classAgreements = [
                {
                    nombre: "000",
                    value: "000"
                }
            ];

            vm.descriptions = [
                {
                    nombre: "PAGO FACTURA POR DISTRIBUCION DE PRODUCTOS",
                    value: "PAGO FACTURA POR DISTRIBUCION DE PRODUCTOS"
                },
                {
                    nombre: "PAGO FACTURA POR PRESTACION DE SERVICIOS",
                    value: "PAGO FACTURA POR PRESTACION DE SERVICIOS"
                },
                {
                    nombre: "PAGO FACTURA SERVICIOS PUBLICOS",
                    value: "PAGO FACTURA SERVICIOS PUBLICOS"
                },
                {
                    nombre: "PAGO FACTURA CARTERA",
                    value: "PAGO FACTURA CARTERA"
                },
                {
                    nombre: "PAGO FACTURA MATRICULAS",
                    value: "PAGO FACTURA MATRICULAS"
                },
                {
                    nombre: "PAGO FACTURA CUOTAS PROYECTOS INMOBILIARIOS",
                    value: "PAGO FACTURA CUOTAS PROYECTOS INMOBILIARIOS"
                },
                {
                    nombre: "PAGO FACTURA ADMINISTRACION",
                    value: "PAGO FACTURA ADMINISTRACION"
                },
                {
                    nombre: "PAGO FACTURA TELEFONIA CELULAR",
                    value: "PAGO FACTURA TELEFONIA CELULAR"
                },
                {
                    nombre: "PAGO FACTURA TELEVISION POR CABLE",
                    value: "PAGO FACTURA TELEVISION POR CABLE"
                }
            ];

            vm.paymentMethods = [
                {
                    nombre: "Efectivo",
                    value: "CASH_PAYMENT"
                },
                {
                    nombre: "Cheque Canje",
                    value: "EXCHANGE_CHECK"
                },
                {
                    nombre: "Cargo a cuenta",
                    value: "LOAD_COUNT_PAYMENT"
                },
                {
                    nombre: "Cheque BBVA",
                    value: "OWN_CHECK_PAYMENT"
                },
                {
                    nombre: "Tarjeta de Crédito",
                    value: "CREDIT_CARD_PAYMENT"
                },
                {
                    nombre: "Crédito Virtual",
                    value: "CREDIT_VIRTUAL_PAYMENT"
                }
            ];

            vm.subscriptionFormats = [
                {
                    nombre: "Detalle en Cuenta",
                    value: "DC"
                },
                {
                    nombre: "Abono Diario (Cta. de Espera)",
                    value: "AD"
                }
            ];

        } else if (vm.typeRequest == 'I') {
            vm.isCollection = false;
            vm.identificationTypes = [
                {
                    nombre: "Cédula",
                    value: "01"
                },
                {
                    nombre: "NIT",
                    value: "03"
                }
            ];

            vm.accountTypes = [
                {
                    nombre: "Cuenta de Ahorros",
                    value: "AH"
                },
                {
                    nombre: "Cuenta Corriente",
                    value: "CC"
                }
            ];

            vm.typeAgreements = [
                {
                    nombre: "Recaudos",
                    value: "001"
                },
                {
                    nombre: "Servicio Publico",
                    value: "002"
                },
                {
                    nombre: "Impuestos",
                    value: "003"
                },
                {
                    nombre: "Impuestos Nuevo",
                    value: "005"
                }
            ];

            vm.classAgreements = [
                {
                    nombre: "000",
                    value: "000"
                },
                {
                    nombre: "Departamental",
                    value: "002"
                }
            ];

            vm.descriptions = [
                {
                    nombre: "PAGO FACTURA POR DISTRIBUCION DE PRODUCTOS",
                    value: "PAGO FACTURA POR DISTRIBUCION DE PRODUCTOS"
                },
                {
                    nombre: "PAGO FACTURA POR PRESTACION DE SERVICIOS",
                    value: "PAGO FACTURA POR PRESTACION DE SERVICIOS"
                },
                {
                    nombre: "PAGO FACTURA SERVICIOS PUBLICOS",
                    value: "PAGO FACTURA SERVICIOS PUBLICOS"
                },
                {
                    nombre: "PAGO FACTURA CARTERA",
                    value: "PAGO FACTURA CARTERA"
                },
                {
                    nombre: "PAGO FACTURA MATRICULAS",
                    value: "PAGO FACTURA MATRICULAS"
                },
                {
                    nombre: "PAGO FACTURA CUOTAS PROYECTOS INMOBILIARIOS",
                    value: "PAGO FACTURA CUOTAS PROYECTOS INMOBILIARIOS"
                },
                {
                    nombre: "PAGO FACTURA ADMINISTRACION",
                    value: "PAGO FACTURA ADMINISTRACION"
                },
                {
                    nombre: "PAGO FACTURA TELEFONIA CELULAR",
                    value: "PAGO FACTURA TELEFONIA CELULAR"
                },
                {
                    nombre: "PAGO FACTURA TELEVISION POR CABLE",
                    value: "PAGO FACTURA TELEVISION POR CABLE"
                },
                {
                    nombre: "PAGO RECAUDO DE IMPUESTOS",
                    value: "PAGO RECAUDO DE IMPUESTOS"
                }
            ];

            vm.paymentMethods = [
                {
                    nombre: "Efectivo",
                    value: "CASH_PAYMENT"
                },
                {
                    nombre: "Cheque Canje",
                    value: "EXCHANGE_CHECK"
                },
                {
                    nombre: "Cargo a cuenta",
                    value: "LOAD_COUNT_PAYMENT"
                },
                {
                    nombre: "Cheque BBVA",
                    value: "OWN_CHECK_PAYMENT"
                }
            ];

            vm.subscriptionFormats = [
                {
                    nombre: "Abono Diario (Cta. de Espera)",
                    value: "AD"
                }
            ];

        }

        vm.typeTaxs = [
            {
                nombre: "Vehiculo",
                value: "1"
            },
            {
                nombre: "Sobre Tasa Gasolina",
                value: "2"
            }
        ];

        vm.stateContracts = [
            {
                nombre: "Activo",
                value: "A"
            },
            {
                nombre: "Inactivo",
                value: "I"
            }
        ];

    }
})();
