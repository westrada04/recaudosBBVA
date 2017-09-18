(function () {
    'use strict';

    angular
        .module('app.aplicacion.createRequest')
        .controller('CreateRequestController', CreateRequestController);

    function CreateRequestController($timeout, $state) {
        var vm = this;
        vm.editAgreement = false;
        vm.changeTypeRequest = changeTypeRequest;
        vm.changeRequestToMade = changeRequestToMade;
        vm.changeTypeAgreement = changeTypeAgreement;
        vm.continuar = continuar;

        vm.typeAgreements = [];
        vm.classAgreements = [];

        vm.typeRequests = [
            {
                nombre: "Recaudo Nacional",
                value: "R"
            },
            {
                nombre: "Impuestos",
                value: "I"
            }
        ];

        vm.requestToMades = [
            {
                nombre: "Alta",
                value: "A"
            },
            {
                nombre: "Modificación",
                value: "M"
            }
        ];

        function changeTypeRequest() {
            if (vm.typeRequest == "I") {
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
            } else {
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
                    }
                ];
            }
        }

        function changeRequestToMade() {
            if (vm.requestToMade == "M") {
                vm.editAgreement = true;
            } else {
                vm.editAgreement = false;
            }
        }

        function changeTypeAgreement() {
            if (vm.typeAgreement == "005") {
                vm.classAgreements = [
                    {
                        nombre: "Departamental",
                        value: "002"
                    }
                ];
            } else {
                vm.classAgreements = [
                    {
                        nombre: "000",
                        value: "000"
                    }
                ];
            }
        }

        function continuar() {

            if (vm.editAgreement) {
                if (vm.agreementCode.length < 7) {
                    var num = '';
                    for (var x = vm.agreementCode.length; x < 7; x++) {
                        num = num + '0';
                    }
                    num = num + vm.agreementCode;
                }
                var idAgreement = vm.typeAgreement + num + vm.classAgreement;

                $timeout(function () {
                    $state.go('templateAuth.createModifyAgreement', {
                        idAgreement: idAgreement
                    });
                });

            } else {
                $timeout(function () {
                    $state.go('templateAuth.createAgreement', {
                        typeRequest: vm.typeRequest
                    });
                });
            }
        }

    }
})();
