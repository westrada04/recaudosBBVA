(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseCreateModify')
        .controller('DataBaseCreateModifyController', DataBaseCreateModifyController);

    function DataBaseCreateModifyController(ConsultAgreementService, DataBaseCreateModifyService, GeneralDataCreateModifyControllerService, toastr) {
        var vm = this;

        //datos traidos
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        var request = ConsultAgreementService.getDataBase();
        vm.date1 = request.date1;
        vm.date2 = request.date2;
        vm.morePayment = request.morePayment;
        vm.databaseType = request.databaseType;
        vm.valor1 = request.valor1;
        vm.valor2 = request.valor2;
        vm.numberCycles = request.numberCycles;
        vm.dueDate = request.dueDate;
        vm.loadKey = request.loadKey;
        vm.dateEncab = request.dateEncab;
        vm.dateDet1 = request.dateEncab;
        vm.updateCycle= request.updateCycle;

        vm.checkSave = checkSave;
        vm.save = save;
        vm.changeDatabaseType = changeDatabaseType;

        vm.statusNetworkCode = false;
        vm.disable = false;
        vm.success = false;

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

            var requestAgrement = GeneralDataCreateModifyControllerService.getRequestAgreement().idAgreement;

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

                vm.myPromise = DataBaseCreateModifyService.createIndicatorGeneral(requestDatabaseType, 'TYPE_VALIDATION_DATA')
                    .then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestLoadKey, 'KEY_LOAD');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestDate1, 'FIRST_EXPIRATION_DAT');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestDate2, 'SECOND_EXPIRATION_DA');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestDateEncab, 'VALIDATE_HEADER_DATE');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestDateDet1, 'VALIDATE_DETAIL_DATE');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestMorePayment, 'RECEIVES_MORE_ONE_PA');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestValor1, 'VALUE_1');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestValor2, 'VALUE_2');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestNumberCycles, 'NUMBER_OF_CYCLES');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestUpdateCycle, 'CHARGE_DATABASE');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestTypeTransmission, 'TYPE_TRANSMISSION');
                    }).then(function (response) {
                        return DataBaseCreateModifyService.createIndicatorGeneral(requestDueDate, 'DAYS_DELETE_EXPIRATI');
                    }).then(function (response) {
                        toastr.info('Registros Exitosos!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });

            } else {
                vm.myPromise = DataBaseCreateModifyService.createIndicatorGeneral(requestDatabaseType, requestDatabaseType.name)
                    .then(function (response) {
                        toastr.info('Guardado correctamente!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });
            }
        }

    }
})();
