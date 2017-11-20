(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseAuthorizer')
        .controller('DataBaseAuthorizerController', DataBaseAuthorizerController);

    function DataBaseAuthorizerController(ConsultAgreementService, DataBaseEditService, toastr, $scope, AuthorizeAgreementService) {
        var vm = this;

        vm.typeRequest = ConsultAgreementService.gettypeRequest();


        //datos traidos
        var request = ConsultAgreementService.getDataBase();
        AuthorizeAgreementService.setBd(request);
        /*vm.date1 = request.date1;
        vm.date2 = request.date2;
        vm.morePayment = request.morePayment;
        vm.databaseType = request.databaseType; 
        vm.valor1 = request.valor1; Prueba pasar valor en servicio
        vm.valor2 = request.valor2;
        vm.numberCycles = request.numberCycles;
        vm.dueDate = request.dueDate;
        vm.loadKey = request.loadKey;
        vm.dateEncab = request.dateEncab;
        vm.dateDet1 = request.dateEncab;
        vm.updateCycle= request.updateCycle;*/
        vm.db1 = AuthorizeAgreementService.getBd();

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
            if (vm.db1.databaseType == 'N') {
                vm.disable = true;
                vm.statusNetworkCode = false;
                vm.success = true;
            } else if (vm.db1.databaseType == "R") {
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
            

              /*  vm.myPromise = DataBaseEditService.createIndicatorGeneral(requestDatabaseType, 'TYPE_VALIDATION_DATA')
                    .then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestLoadKey, 'KEY_LOAD');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestDate1, 'FIRST_EXPIRATION_DAT');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestDate2, 'SECOND_EXPIRATION_DA');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestDateEncab, 'VALIDATE_HEADER_DATE');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestDateDet1, 'VALIDATE_DETAIL_DATE');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestMorePayment, 'RECEIVES_MORE_ONE_PA');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestValor1, 'VALUE_1');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestValor2, 'VALUE_2');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestNumberCycles, 'NUMBER_OF_CYCLES');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestUpdateCycle, requestUpdateCycle.name);
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestTypeTransmission, 'TYPE_TRANSMISSION');
                    }).then(function (response) {
                        return DataBaseEditService.createIndicatorGeneral(requestDueDate, 'DAYS_DELETE_EXPIRATI');
                    }).then(function (response) {
                        toastr.info('Registros Exitosos!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });

            } else {
                vm.myPromise = DataBaseEditService.createIndicatorGeneral(requestDatabaseType, requestDatabaseType.name)
                    .then(function (response) {
                        toastr.info('Guardado correctamente!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });
            }*/
        }

    }
})();
