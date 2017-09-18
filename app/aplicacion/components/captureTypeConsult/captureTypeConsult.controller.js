(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureTypeConsult')
        .controller('CaptureTypeConsultController', CaptureTypeConsultController);

    function CaptureTypeConsultController(CreateAgreementService, ConsultAgreementService) {
        var vm = this;
        var requestCaptureType = ConsultAgreementService.getCaptureType();
        vm.typeRequest = CreateAgreementService.getTypeRequest();

        vm.type = requestCaptureType.type;
        vm.typeRequest = requestCaptureType.typeAgreement;
        vm.eanCode = requestCaptureType.EANCode;
        vm.associatedAgreements = requestCaptureType.associatedAgreements;
        vm.listStatusAssociatedAgreements = requestCaptureType.listStatusAssociatedAgreements;
        vm.statusAssociatedAgreements = requestCaptureType.statusAssociatedAgreements;

        if (vm.type == "B" || vm.type == "A") {
            vm.statusCodeEan = true;
        } else {
            vm.statusCodeEan = false;
        }

        vm.changeType = changeType;
        vm.statusCollectionCard = false;

        if (vm.typeRequest == 'R') {
            vm.types = [
                {
                    nombre: "Manual",
                    value: "M"
                },
                {
                    nombre: "Código de Barras",
                    value: "B"
                },
                {
                    nombre: "Manual y Código de Barras",
                    value: "A"
                },
                {
                    nombre: "Tarjeta de Recaudo",
                    value: "T"
                }
            ];
        } else if (vm.typeRequest == 'I') {
            vm.types = [
                {
                    nombre: "Manual",
                    value: "M"
                },
                {
                    nombre: "Código de Barras",
                    value: "B"
                },
                {
                    nombre: "Manual y Código de Barras",
                    value: "A"
                }
            ];
        }


        function changeType() {
            if (vm.type == '' || vm.type == 'M') {
                vm.statusCodeEan = false;
                vm.statusCollectionCard = false;
            } else if (vm.type == 'B' || vm.type == 'A') {
                vm.statusCollectionCard = false;
                vm.statusCodeEan = true;
            } else if (vm.type == 'T') {
                vm.statusCodeEan = true;
                vm.statusCollectionCard = true;
            }
        }
    }
})();
