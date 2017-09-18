(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondentEdit')
        .controller('BankCorrespondentEditController', BankCorrespondentEditController);

    function BankCorrespondentEditController(toastr) {
        var vm = this;

        vm.titleType = '';
        vm.statusWC = false;

        vm.changeType = changeType;
        vm.save = save;

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

        function save() {
            toastr.info('Modulo no Implementado', 'Informacion !');
        }
    }
})();
