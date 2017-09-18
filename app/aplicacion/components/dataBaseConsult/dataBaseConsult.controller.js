(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseConsult')
        .controller('dataBaseConsultController', dataBaseConsultController);

    function dataBaseConsultController(CreateAgreementService, ConsultAgreementService, toastr) {
        var vm = this;
        var requestDataBase = ConsultAgreementService.getDataBase();
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        vm.checkSave = checkSave;
        
        vm.changeDatabaseType = changeDatabaseType;
        vm.statusNetworkCode = false;

        vm.disable = true;

        vm.success = false;

        vm.date1 = requestDataBase.date1;
        vm.date2 = requestDataBase.date2;
        vm.morePayment = requestDataBase.morePayment;
        vm.databaseType = requestDataBase.databaseType;
        vm.valor1 = requestDataBase.valor1;
        vm.valor2 = requestDataBase.valor2;
        vm.numberCycles = requestDataBase.numberCycles;
        vm.dueDate = requestDataBase.dueDate;
        vm.loadKey = requestDataBase.loadKey;
        vm.updateCycle = requestDataBase.updateCycle;
        vm.deliveryPeriod = requestDataBase.deliveryPeriod;
        vm.referencePosition = requestDataBase.referencePosition;
        vm.dateEncab = requestDataBase.dateEncab;
        vm.dateDet1 = requestDataBase.dateEncab;
               
        
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
      

    }
})();
