(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondentConsult')
        .controller('BankCorrespondentConsultController', BankCorrespondentConsultController);

    function BankCorrespondentConsultController() {
        var vm = this;

        vm.changeType = changeType;
        vm.titleType = '';
        vm.statusWC = false;

        vm.types = [
            {
                nombre: 'Webservice',
                value: 'WS'
            },
            {
                nombre: 'Credibanco',
                value: 'CB'
            }
        ];

        vm.contractsStatus = [
            {
                nombre: 'Activo',
                value: 'A'
            },
            {
                nombre: 'Inactivo',
                value: 'I'
            }
        ];


        vm.agreementTypes = [
            {
                nombre: 'Recaudo Nacional',
                value: '01'
            },
            {
                nombre: 'Servicios Públicos',
                value: '02'
            },
            {
                nombre: 'Impuestos Distritales',
                value: '03'
            },
            {
                nombre: 'Impuestos Nuevos',
                value: '05'
            }
        ];

        vm.paymentMethods = [
            {
                nombre: 'Efectivo',
                value: 'EF'
            }
        ];

        function changeType() {
            if (vm.type == '') {
                vm.statusWC = false;
            } else if (vm.type == 'WS') {
                vm.titleType = 'Webservice';
                vm.statusWC = true;
            } else if (vm.type == 'CB') {
                vm.titleType = 'Credibanco';
                vm.statusWC = true;
            }
        }
    }
})();
