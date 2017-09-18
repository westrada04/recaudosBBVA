(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGenerationConsult')
        .controller('PinGenerationConsultController', PinGenerationConsultController);

    function PinGenerationConsultController() {
        var vm = this;

        vm.changeTypePin = changeTypePin;
        vm.addFixedData = addFixedData;
        vm.deleteFixedData = deleteFixedData;
        vm.stateNumeric = false;
        vm.stateFixedData = false;

        vm.fixedDatas = [];
        var fixedData = {
            fixedField: '',
            description: '',
            minAmount: '',
            maxAmount: ''
        };
        vm.fixedDatas.push(fixedData);

        vm.typePins = [
            {
                nombre: "Pin Tipo Universidad",
                value: "TU"
            },
            {
                nombre: "Pin Tipo BBVA",
                value: "TB"
            },
            {
                nombre: "Pin Tipo Identificación",
                value: "TI"
            },
            {
                nombre: "Pin Tipo Aleatorio",
                value: "TA"
            },
            {
                nombre: "Pin Base de Datos",
                value: "BD"
            },
            {
                nombre: "Pin Web Services",
                value: "WS"
            }
        ];

        vm.numericAlphanumerics = [
            {
                nombre: "Numérico",
                value: "N"
            },
            {
                nombre: "Alfanumerico",
                value: "A"
            }
        ];

        function changeTypePin() {
            if (vm.typePin == '' || vm.typePin == 'BD' || vm.typePin == 'TU') {
                vm.stateNumeric = false;
                vm.stateFixedData = false;
            } else if (vm.typePin == 'TA') {
                vm.stateNumeric = true;
                vm.stateFixedData = false;
            } else if (vm.typePin == 'TB' || vm.typePin == 'TI' || vm.typePin == 'WS') {
                vm.stateNumeric = false;
                vm.stateFixedData = true;
            }
        }

        function addFixedData() {
            var fixedData = {
                fixedField: '',
                description: '',
                minAmount: '',
                maxAmount: ''
            };
            vm.fixedDatas.push(fixedData);
        }

        function deleteFixedData(index) {
            if (vm.fixedDatas.length > 1) {
                vm.fixedDatas.splice(index, 1);
            } else {
                vm.fixedDatas.splice(index, 1);
                vm.fixedDatas.push({
                    fixedField: '',
                    description: '',
                    minAmount: '',
                    maxAmount: ''
                });
            }
        }
    }
})();
