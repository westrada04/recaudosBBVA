(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.pinGenerationAuthorizer')
        .controller('PinGenerationAuthorizerController', PinGenerationAuthorizerController);

    function PinGenerationAuthorizerController(GeneralDataEditService, PinGenerationEditService, toastr, ConsultAgreementService) {
        var vm = this;

        //obtener datos no se obtienen hasta el momento 
        var request = ConsultAgreementService.getPin();
        vm.typePin = request.typePin;
        vm.algorythm = request.algorythm;
        vm.numericAlphanumeric = request.numericAlphanumeric;
        vm.NumberDigits = request.NumberDigits;
        vm.changeTypePin = changeTypePin;
        vm.save = save;
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

        function save() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement();

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            var pingen = {};
            switch (vm.typePin) {
                case 'TU':
                    pingen.id = "UNIV";
                    pingen.name = "TIPO Universidad";
                    pingen.type = "TIPO 1";
                    pingen.typeId = "01";
                    break;
                case 'TB':
                    pingen.id = "BBVA";
                    pingen.name = "TIPO BBVA";
                    pingen.type = "TIPO 2";
                    pingen.typeId = "02";
                    break;
                case 'TI':
                    pingen.id = "ID";
                    pingen.name = "TIPO Identificacion";
                    pingen.type = "TIPO 3";
                    pingen.typeId = "03";
                    break;
                case 'TA':
                    pingen.id = "RAND";
                    pingen.name = "TIPO Aleatorio";
                    pingen.type = "TIPO 4";
                    pingen.typeId = "04";
                    break;
                case 'DB':
                    pingen.name = "TIPO Data Bases";
                    pingen.type = "TIPO 5";
                    break;
                case 'WS':
                    pingen.name = "TIPO Web Services";
                    pingen.type = "TIPO 6";
                    break;
            }

            var listPin = [{
                id: pingen.id,
                name: pingen.name,
                pinType: {
                    id: pingen.typeId,
                    name: vm.numericAlphanumeric == undefined ? '' : vm.numericAlphanumeric
                },
                algorithm: vm.algorythm,
                value: vm.NumberDigits == undefined ? '' : vm.NumberDigits,
                digitNumber: vm.NumberDigits == undefined ? 0 : vm.NumberDigits
            }];

            requestAgrement.agreementConfiguration.pin = listPin;

            var myPromise = PinGenerationEditService.createAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
