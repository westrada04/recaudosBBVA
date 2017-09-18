(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBase')
        .controller('DataBaseController', DataBaseController);

    function DataBaseController(CreateAgreementService, DataBaseService, GeneralDataService, toastr) {
        var vm = this;

        vm.typeRequest = CreateAgreementService.getTypeRequest();

        vm.checkSave = checkSave;
        vm.save = save;

        vm.changeDatabaseType = changeDatabaseType;
        vm.statusNetworkCode = false;

        vm.disable = false;

        vm.success = false;

        // inicializacion
        vm.valor1 = false;
        vm.date1 = false;
        vm.valor2 = false;
        vm.date2 = false;
        vm.dateDet1 = false;
        vm.dateEncab = false;
        vm.morePayment = false;
        vm.deliveryPeriod = 'Mensual';
        vm.loadKey = "1";

        if (vm.typeRequest == 'R') {

            vm.databaseTypes = [
                {
                    nombre: "WebService",
                    value: "W"
            },
                {
                    nombre: "Bases de Datos Propias",
                    value: "S"
            },
                {
                    nombre: "Redeban",
                    value: "R"
            },
                {
                    nombre: "Double Ref. en Base de Datos",
                    value: "C"
            },
                {
                    nombre: "Multifactura Webservice",
                    value: "M"
            },
                {
                    nombre: "No Válida",
                    value: "N"
            }
            ];

        } else if (vm.typeRequest == 'I') {
            vm.databaseTypes = [
                {
                    nombre: "WebService",
                    value: "W"
            },
                {
                    nombre: "Bases de Datos Propias",
                    value: "S"
            },
                {
                    nombre: "Redeban",
                    value: "R"
            },
                {
                    nombre: "Double Ref. en Base de Datos",
                    value: "C"
            },
                {
                    nombre: "No Válida",
                    value: "N"
            }
            ];
        }



        vm.updateCycles = [
            {
                nombre: "Total",
                value: "T"
        },
            {
                nombre: "Parcial",
                value: "P"
        }
        ];

        vm.deliveryPeriods = [
            {
                nombre: "Diaria",
                value: "Diaria"
        },
            {
                nombre: "Mensual",
                value: "Mensual"
        },
            {
                nombre: "Semanal",
                value: "Semanal"
        }
        ];

        vm.loadKeys = [
            {
                nombre: "EAN",
                value: "1"
        },
            {
                nombre: "NIT",
                value: "2"
        }
        ];

        function changeDatabaseType() {
            if (vm.databaseType == 'N') {
                vm.disable = true;
                vm.statusNetworkCode = false;
                vm.success = true;
            } else if (vm.databaseType == "R") {
                vm.statusNetworkCode = true;
                vm.disable = false;
                vm.success = false;
            } else {
                vm.statusNetworkCode = false;
                vm.disable = false;
                vm.success = false;
            }
        }

        function checkSave(dataBase) {
            if (vm.success || dataBase.$valid) {
                return false;
            } else {
                return true;
            }
        }

        function save() {
            var requestAgrement = GeneralDataService.getRequestAgreement().idAgreement;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            // Tipo de Base de Datos
            var requestDatabaseType = {
                "name": "TYPE_VALIDATION_DATA",
                "isActive": vm.databaseType != "",
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.databaseType,
                    name: vm.databaseType
                }],
            };
            if (vm.databaseType != "N") {

                // Posición de Referencia
                var requestReferencePosition = {
                    "name": "REFERENCE_POSITION",
                    "isActive": vm.referencePosition != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        id: vm.referencePosition,
                        name: vm.referencePosition
                    }]
                };

                // Periodo de Entrega
                var requestDeliveryPeriod = {
                    "name": "DELIVERY_PERIOD",
                    "isActive": vm.deliveryPeriod != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        id: vm.deliveryPeriod,
                        name: vm.deliveryPeriod
                    }]
                };

                // Valida Fecha 1
                var requestDate1 = {
                    "name": "FIRST_EXPIRATION_DAT",
                    "isActive": vm.date1,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }],
                };

                // valida fecha 2
                var requestDate2 = {
                    "name": "SECOND_EXPIRATION_DA",
                    "isActive": vm.date2,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }],
                };

                // Valida Fecha Encab
                var requestDateEncab = {
                    "name": "VALIDATE_HEADER_DATE",
                    "isActive": vm.dateEncab,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                };

                // Valida Fecha Det 1
                var requestDateDet1 = {
                    "name": "VALIDATE_DETAIL_DATE",
                    "isActive": vm.dateDet1,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                };

                // Recibe más de un pago
                var requestMorePayment = {
                    "name": "RECEIVES_MORE_ONE_PA",
                    "isActive": vm.morePayment,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }],
                };

                // Valida Valor 1
                var requestValor1 = {
                    "name": 'VALUE_1',
                    "isActive": vm.valor1,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                };

                // Valida Valor 2
                var requestValor2 = {
                    "name": 'VALUE_2',
                    "isActive": vm.valor2,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                };

                // Numero de Ciclos
                var requestNumberCycles = {
                    "name": "NUMBER_OF_CYCLES",
                    "isActive": true,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": vm.numberCycles,
                        "name": vm.numberCycles
                    }]
                };

                // Ciclos de Actualización
                var requestUpdateCycle = {
                    "name": "CHARGE_DATABASE",
                    "isActive": vm.updateCycle != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": vm.updateCycle,
                        "name": vm.updateCycle
                    }]
                };

                // tipo de transmicion   
                var requestTypeTransmission = {
                    "name": "TYPE_TRANSMISSION",
                    "isActive": true,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": '0',
                        "name": '0'
                    }]
                };

                // Días de Borrado Fecha de Vencimient
                var requestDueDate = {
                    "name": "DAYS_DELETE_EXPIRATI",
                    "isActive": vm.dueDate != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": vm.dueDate,
                        "name": vm.dueDate
                    }]
                };

                // Llave de Carga
                var requestLoadKey = {
                    "name": "KEY_LOAD",
                    "isActive": vm.loadKeys != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": vm.loadKey,
                        "name": vm.loadKey
                    }]
                };

                vm.myPromise = DataBaseService.createIndicatorGeneral(requestDatabaseType, 'TYPE_VALIDATION_DATA')
                    .then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestLoadKey, 'KEY_LOAD');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestDeliveryPeriod, 'DELIVERY_PERIOD');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestDate1, 'FIRST_EXPIRATION_DAT');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestDate2, 'SECOND_EXPIRATION_DA');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestDateEncab, 'VALIDATE_HEADER_DATE');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestDateDet1, 'VALIDATE_DETAIL_DATE');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestMorePayment, 'RECEIVES_MORE_ONE_PA');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestValor1, 'VALUE_1');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestValor2, 'VALUE_2');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestNumberCycles, 'NUMBER_OF_CYCLES');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestUpdateCycle, 'CHARGE_DATABASE');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestTypeTransmission, 'TYPE_TRANSMISSION');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestDueDate, 'DAYS_DELETE_EXPIRATI');
                    }).then(function (response) {
                        return DataBaseService.createIndicatorGeneral(requestReferencePosition, 'REFERENCE_POSITION');
                    }).then(function (response) {
                        toastr.info('Registros Exitosos!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });

            } else {
                vm.myPromise = DataBaseService.createIndicatorGeneral(requestDatabaseType, requestDatabaseType.name)
                    .then(function (response) {
                        toastr.info('Guardado correctamente!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });
            }
        }

    }
})();
