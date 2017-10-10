(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalDataEdit')
        .controller('GeneralDataEditController', GeneralDataEditController);

    function GeneralDataEditController($scope, EditAgreementService, GeneralDataEditService, toastr, ConsultAgreementService) {
        var vm = this;

        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        vm.user = ConsultAgreementService.getUser();
        vm.manager = vm.user.nombres + ' ' + vm.user.apellidos;
        vm.startTime = new Date(1970, 0, 1, 3, 0, 1);
        vm.finalHour = new Date(1970, 0, 1, 3, 1, 1);
        vm.paymentMethodsSelected = [];
        
        //datos traidos
        var request = ConsultAgreementService.getGeneralData();
        vm.managerEmail = request.managerEmail;
        vm.stateemail = true;
        if (vm.managerEmail == '')  {
            vm.stateemail= false;
        }
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
        vm.description = request.description;
        vm.agreementDescription = request.description;
        vm.expirationDate = request.expirationDate;
        vm.waitingAccountNumber = request.waitingAccountNumber;
        vm.isTaxAndAdditional = request.isTaxAndAdditional;
        vm.tax0044 = request.tax0044;
        vm.typeTax = request.typeTax;
        vm.stateContract = request.stateContract;
        vm.paymentMethodsSelected = request.paymentMethodsSelected;
        vm.alternateCompany = request.alternateCompany;
        vm.codeAlternateCompany = request.codeAlternateCompany;
        vm.classAlternateCompany = request.classAlternateCompany;
        vm.banking = request.banking;

        if (vm.paymentMethodsSelected.length > 0) {
            vm.statusPaymentMethod = false;
        } else {
            vm.statusPaymentMethod = true;
        }

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

        vm.checkSave = checkSave;
        vm.save = save;
        vm.changeIdentificationType = changeIdentificationType;
        vm.addPaymentMethod = addPaymentMethod;
        vm.deletePaymentMethodSelected = deletePaymentMethodSelected;
        vm.changeSubscriptionFormat = changeSubscriptionFormat;
        vm.validar = validar;
        save();
        

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
                value: "01"
            },
            {
                nombre: "Sobre Tasa Gasolina",
                value: "02"
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
        function validar() { // 1
            var tecla = (document.all) ? event.keyCode : event.which; // 2
            if (tecla==8) return true; // 3
            var patron =/\d/; // 4
            var te = String.fromCharCode(tecla); // 5
            event.returnValue = patron.test(te); // 6
        }

        function changeIdentificationType() {
            if (vm.identificationType != '') {

                if (vm.identificationType == '03') {
                    vm.stateVer = true;
                } else {
                    vm.stateVer = false;
                }

            } else {
                vm.stateVer = false;
            }
        }

        function addPaymentMethod() {
            angular.forEach(vm.paymentMethods, function (value, key) {
                if (vm.paymentMethod == value.value) {
                    var sw = true;
                    angular.forEach(vm.paymentMethodsSelected, function (value2, key2) {
                        if (value.value == value2.value) {
                            sw = false;
                            toastr.error('Forma de pago ya seleccionada.', 'Error');
                        }
                    });
                    if (sw) {
                        vm.paymentMethodsSelected.push(value);
                    }
                }
            });
        }

        function deletePaymentMethodSelected(paymentMethod) {
            var n = '';

            for (var i = 0; i < vm.paymentMethodsSelected.length; i++) {
                if (paymentMethod == vm.paymentMethodsSelected[i]) {
                    n = i;
                }
            }

            if (n != '' || n == '0') {
                vm.paymentMethodsSelected.splice(n, 1);
            }
            var requestDelPaymentM ={
                "name": "PAYMENT_METHOD",
                "isActive": false,
                "limits": [{"start": "","end": ""}],
                "value":  [{"id":'N',"name": paymentMethod.value}]
            };
            vm.myPromise = GeneralDataEditService.createIndicatorGeneral(requestDelPaymentM, requestDelPaymentM.name)
                .then(function (response) {
                    toastr.info('Forma de pago eliminada con exito.<br> : ' , 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Error eliminando forma de pago <br>' + error.data["error-message"], 'Error');
                });

        }

        function changeSubscriptionFormat() {
            if (vm.subscriptionFormat == "AD") {
                vm.statusSubscriptionFormat = true;
                if (vm.typeRequest == 'I') {
                    vm.isTaxAndAdditional = true;
                } else {
                    vm.isTaxAndAdditional = false;
                }
            } else {
                vm.statusSubscriptionFormat = false;
                vm.isTaxAndAdditional = false;
            }
        }

        $scope.$watch('vm.ucw', function (value) {
            if (vm.ucw == true) {
                vm.statusUcw = true;
            } else {
                vm.statusUcw = false;
            }
        });

        

        function checkSave(generalData) {
            if (!generalData.$valid) {
                return false;
            } else {
                return true;
            }
        }

        function save() {

            var tacta = vm.accountNumber.length;
            var ceroCta = '';
            var accountNumber;
            var swservice = true;

            if (tacta < 18) {
                for (var i = 0; i < (18 - tacta); i++) {
                    ceroCta = ceroCta + '0';
                }
            }

            accountNumber = ceroCta + vm.accountNumber;

            //eliminar esto a futuro.
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            var hora = today.getHours();
            var min = today.getMinutes();
            var seg = today.getSeconds();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            if (hora < 10) {
                hora = '0' + hora;
            }

            if (min < 10) {
                min = '0' + min;
            }

            if (seg < 10) {
                seg = '0' + seg;
            }
            var today = yyyy + "-" + mm + "-" + dd + "T" + hora + ":" + min + ":" + seg;

            // hasta aqui eliminar
            var nametypeAgreement;
            var numberIdentification = '';
            var conveAlter="0";
            ceroCta = '';
            if (vm.codeAlternateCompany < 7) {
                for (var i = 0; i < (7-vm.codeAlternateCompany.length); i++) {
                    ceroCta = ceroCta + '0';
                }
            } 
            conveAlter= vm.alternateCompany + ceroCta + vm.codeAlternateCompany + vm.classAlternateCompany;


            angular.forEach(vm.typeAgreements, function (value, key) {
                if (vm.typeAgreement == value.value) {
                    nametypeAgreement = value.nombre;
                }
            });

            if (vm.identificationNumber.length < 15) {
                var t = 15 - vm.identificationNumber.length;
                for (var i = 0; i < t; i++) {
                    numberIdentification = numberIdentification + '0';
                }
                numberIdentification = vm.identificationType + numberIdentification + vm.identificationNumber;
            } else {
                numberIdentification = vm.identificationType + vm.identificationNumber;
            }

            if (vm.stateVer) {
                numberIdentification += vm.ver;
            }

            var relatedContract = [];

            // cuenta principal - centralizadora
            var relatedAccount = {
                "relatedContractId": 1,
                "contractId": 1,
                "number": accountNumber,
                "product": {
                    "id": accountNumber.substring(8, 10),
                    "name": vm.accountType
                },
                "relationType": {
                    "id": "CON",
                    "name": "Cuenta central"
                },
                "percentage": 0,
                "bankId": accountNumber.substring(0, 4)
            };
            relatedContract.push(relatedAccount);

            // cuenta de espera
            if (vm.subscriptionFormat == 'AD') {
                var waitingAccount = {
                    "relatedContractId": 2,
                    "contractId": 2,
                    "number": vm.waitingAccountNumber,
                    "product": {
                        "id": '19',
                        "name": '9999 CTA Espera'
                    },
                    "relationType": {
                        "id": "CTA",
                        "name": "Cuenta de espera"
                    },
                    "percentage": 0,
                    "bankId": vm.waitingAccountNumber.substring(0, 4)
                };
                relatedContract.push(waitingAccount);
            }

            // cuenta 0044
            if (vm.typeRequest == 'I' && vm.subscriptionFormat == 'AD') {
                var account0044 = {
                    "relatedContractId": 3,
                    "contractId": 3,
                    "number": vm.tax0044,
                    "product": {
                        "id": '19',
                        "name": vm.typeTax
                    },
                    "relationType": {
                        "id": "044",
                        "name": "0044"
                    },
                    "percentage": 0,
                    "bankId": vm.tax0044.substring(0, 4)
                };
                relatedContract.push(account0044);
            }

            var horaStartTime = vm.startTime.getHours();
            var minutesStartTime = vm.startTime.getMinutes();
            var secondStartTime = vm.startTime.getSeconds();

            if (vm.startTime.getHours() < 10) {
                horaStartTime = '0' + vm.startTime.getHours();
            }

            if (vm.startTime.getMinutes() < 10) {
                minutesStartTime = '0' + vm.startTime.getMinutes();
            }

            if (vm.startTime.getSeconds() < 10) {
                secondStartTime = '0' + vm.startTime.getSeconds();
            }
            var startTime = horaStartTime + ":" + minutesStartTime + ':' + secondStartTime;

            var horaFinalHour = vm.finalHour.getHours();
            var minutesFinalHour = vm.finalHour.getMinutes();
            var secondFinalHour = vm.finalHour.getSeconds();

            if (vm.finalHour.getHours() < 10) {
                horaFinalHour = '0' + vm.finalHour.getHours();
            }

            if (vm.finalHour.getMinutes() < 10) {
                minutesFinalHour = '0' + vm.finalHour.getMinutes();
            }

            if (vm.finalHour.getSeconds() < 10) {
                secondFinalHour = '0' + vm.finalHour.getSeconds();
            }
            var finalHour = horaFinalHour + ':' + minutesFinalHour + ':' + secondFinalHour;

            // creacion o actualizacion!
            if (GeneralDataEditService.getRequestAgreement().idAgreement == undefined) {
                swservice =false;        
                var requestAgreement = {
                    "idAgreement": EditAgreementService.getIdAgreement(),
                    "agreementType": {
                        "id": EditAgreementService.getIdAgreement(),
                        "name": nametypeAgreement
                    },
                    "name": vm.agreementName,
                    "agreementDescription": vm.description,
                    "status": {
                        "id": "P",
                        "name": "Procesando",
                        "dateState": vm.expirationDate,
                        "statusType": {
                            "id": "P",
                            "name": "Procesando",
                            "dateStatusType": today
                        }
                    },
                    "agreementClass": {
                        "id": vm.typeRequest == 'R' ? '1' : '2',
                        "name": vm.typeRequest == 'R' ? 'REC' : 'IMP',
                        "agreementClassType": {
                            "id": vm.typeRequest == 'R' ? '1' : '2',
                            "name": vm.typeRequest == 'R' ? '001' : '002'
                        }
                    },"RBMCode": "11  "+ conveAlter,
                    /* Verificar componente base de datos campo networkCode*/
                    "relatedParticipants": [
                        {
                            "participantId": numberIdentification,
                            "participantTypeId": vm.identificationType,
                            "relationType": {
                                "id": "1",
                                "name": "cliente" //verificar esto 
                            }
                        },
                        {
                            "participantId": vm.manager,
                            "participantTypeId": 99,
                            "relationType": {
                                "id": "99",
                                "name": vm.manager
                            }
                        }
                    ],
                    "relatedContract": relatedContract,
                    "EANCode": request.EANCode, // formulario de tipo de captura campo eancode
                    "cards": [{}],
                    "notifications": [
                        {
                            "notificationsType": {
                                "id": "03",
                                "name": "EMAIL  P"
                            },
                            "receiver": {
                                "receiverType": {
                                    "id": "1",
                                    "name": "Cliente"
                                },
                                "value": vm.managerEmail,
                                "name": vm.managerEmail
                            },
                            "typeReport": {
                                "id": "1",
                                "name": "",
                                "typeTax": {
                                    "id": "1",
                                    "name": "DEPARTAMENTAL"
                                }
                            },
                            "nameTax": ""
                        }
                    ],
                    "agreementConfiguration": {
                        "parameter": [],
                        "pin": [],
                        "channel": []
                    },
                    "horaInicio": startTime,
                    "horaFin": finalHour
                };
                GeneralDataEditService.setRequestAgreement(requestAgreement);        

            } else {
                var requestAgreement = GeneralDataEditService.getRequestAgreement();
                requestAgreement.name = vm.agreementName;
                requestAgreement.agreementDescription = vm.description;
                requestAgreement.status.dateState = vm.expirationDate;
                requestAgreement.agreementClass.id = vm.typeRequest == 'R' ? '1' : '2';
                requestAgreement.agreementClass.name = vm.typeRequest == 'R' ? 'REC' : 'IMP';
                requestAgreement.agreementClass.agreementClassType.id = vm.typeRequest == 'R' ? '1' : '2';
                requestAgreement.agreementClass.agreementClassType.name = vm.typeRequest == 'R' ? '001' : '002';
                requestAgreement.relatedParticipants[0].participantId = numberIdentification;
                requestAgreement.relatedParticipants[0].participantTypeId = vm.identificationType;
                requestAgreement.relatedParticipants[1].participantId = vm.manager;
                requestAgreement.relatedParticipants[1].relationType.name = vm.manager;
                requestAgreement.RBMCode= requestAgreement.RBMCode.substring(0,4) + conveAlter,

                // cuenta principal - centralizadora
                requestAgreement.relatedContract[0].number = accountNumber;
                requestAgreement.relatedContract[0].product.id = accountNumber.substring(8, 10);
                requestAgreement.relatedContract[0].product.name = vm.accountType;
                requestAgreement.relatedContract[0].bankId = accountNumber.substring(0, 4);

                // cuenta de espera
                if (vm.subscriptionFormat == 'AD') {
                    requestAgreement.relatedContract[1].number = vm.waitingAccountNumber;
                    requestAgreement.relatedContract[1].bankId = vm.waitingAccountNumber.substring(0, 4);
                }

                // cuenta 0044
                if (vm.typeRequest == 'I' && vm.subscriptionFormat == 'AD') {
                    requestAgreement.relatedContract[2].number = vm.tax0044;
                    requestAgreement.relatedContract[2].product.name = vm.typeTax;
                    requestAgreement.relatedContract[2].bankId = vm.tax0044.substring(0, 4);
                }

                requestAgreement.notifications[0].receiver.value = vm.managerEmail;
                requestAgreement.notifications[0].receiver.name = vm.managerEmail;

                requestAgreement.horaInicio = startTime;
                requestAgreement.horaFin = finalHour;
            }

            // ENVIO DE PAYMENT_METHOD
            var requestPaymentMethods = [];
            var namePaymentMethod = '';

            angular.forEach(vm.paymentMethodsSelected, function (value, key) {
                
                requestPaymentMethods.push({
                    "name": "PAYMENT_METHOD",
                    "isActive": true,
                    "limits": [{
                        "start": "",
                        "end": ""
                        }],
                    "value": [{
                        "name": value.value,
                        "id": "S"
                        }]
                });
            });

            // cuenta de espera
            var requestWaitingAccount = {
                "name": "EXTRACT_PAYMENT",
                "isActive": vm.subscriptionFormat == "AD" ? true : false,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.subscriptionFormat == "AD" ? 'AD' : '',
                    "name": vm.subscriptionFormat == "AD" ? 'AD' : '',
                }]
            };

            // Activa Masiva
            var requestMassiveActive = {
                "name": "BULK_ACTIVE",
                "isActive": vm.massiveActive,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }]
            };

            // inhouse
            var requestInHouse = {
                "name": "IN_HOUSE",
                "isActive": vm.inhouse,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }]
            };

            // consecutivo
            var requestConsecutive = {
                "name": "CONSECUTIVE",
                "isActive": vm.consecutive,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }]
            };

            //multilote
            var requestMultilote = {
                "name": "MULTILOTE",
                "isActive": vm.multilote,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }]
            };

            //trafico de documentos
            var requestDocumentTraffic = {
                "name": "TRAFFIC_DOCUMENTS",
                "isActive": vm.documentTraffic,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }]
            };

            //webservices
            var requestWebService = {
                "name": "WS_UNIFICATION",
                "isActive": vm.ucw,
                "limits": [{
                    "start": "",
                    "end": ""
                    }],
                "value": [{
                    "id": vm.ucw ? vm.ucwCode : "",
                    "name": vm.ucw ? vm.ucwCode : ""
                    }]
            };

            if (swservice){

                vm.myPromise = GeneralDataEditService.createAgreement(requestAgreement)
                .then(function (response) {
                    //CreateAgreementService.setIdAgreement(response.data.idAgreement);
                    requestAgreement.idAgreement = response.data.idAgreement;
                    GeneralDataEditService.setRequestAgreement(requestAgreement);
                    $scope.$parent.$broadcast('idAgreement', response.data.idAgreement);
                    toastr.info('Solicitud modificada con exito.<br> Solicitud : ' + response.data.idAgreement, 'Informacion !');
                    return GeneralDataEditService.createIndicatorListGneral(requestPaymentMethods, 'PAYMENT_METHOD');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestWaitingAccount, 'EXTRACT_PAYMENT');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestMassiveActive, 'BULK_ACTIVE');
                    //   }).then(function (response) {
                    //        return GeneralDataEditService.createIndicatorGeneral(requestInHouse, 'IN_HOUSE');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestConsecutive, 'CONSECUTIVE');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestMultilote, 'MULTILOTE');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestDocumentTraffic, 'TRAFFIC_DOCUMENTS');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestWebService, 'WS_UNIFICATION');
                }).then(function () {
                    toastr.info('Registros Exitosos!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
            }
        }
    }
})();
    