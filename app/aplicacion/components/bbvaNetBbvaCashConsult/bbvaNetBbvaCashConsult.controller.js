(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashConsult')
        .controller('BbvaNetBbvaCashConsultController', BbvaNetBbvaCashConsultController);

    function BbvaNetBbvaCashConsultController() {
        var vm = this;

        vm.status = true;

        vm.activate = activate;
        vm.deactivate = deactivate;

        vm.references = [];
        var reference = {
            fieldType: '',
            referenceDescription: ''
        };
        vm.references.push(reference);

        vm.addReference = addReference;
        vm.deleteReference = deleteReference;

        vm.categories = [
            {
                nombre: 'Servicios Públicos',
                value: '001'
            },
            {
                nombre: 'Telefonía Celular',
                value: '002'
            }
        ];

        vm.subcategories = [
            {
                nombre: 'Bogotá',
                value: '001'
            },
            {
                nombre: 'Medellín',
                value: '002'
            }
        ];

        vm.formats = [
            {
                nombre: 'Validación B.D. y existe un formato con validación B.D. Con valor sugerido',
                value: '01'
            },
            {
                nombre: 'Validación Dígito de Chequeo',
                value: '02'
            },
            {
                nombre: 'Con confirmación de referencia y valor',
                value: '03'
            },
            {
                nombre: 'Con confirmación de dos referencias y valor',
                value: '04'
            },
            {
                nombre: 'Pago con validación B.D. y con un dato adicional',
                value: '05'
            },
            {
                nombre: 'Validación de número de B.D. pero no valor',
                value: '06'
            }
        ];

        vm.fieldTypes = [
            {
                nombre: 'IC Importe con confirmación',
                value: 'IC'
            },
            {
                nombre: 'IS Importe sin confirmación',
                value: 'IS'
            },
            {
                nombre: 'AC Alfanumerico con confirmación',
                value: 'AC'
            },
            {
                nombre: 'AS Alfanumerico sin confirmación',
                value: 'AS'
            },
            {
                nombre: 'NC Numerico con Confirmación',
                value: 'NC'
            },
            {
                nombre: 'NS Numerico sin confirmación',
                value: 'NS'
            }
        ];

        function activate() {
            vm.status = false;
        }

        function deactivate() {
            vm.status = true;
        }

        function addReference() {
            var reference = {
                fieldType: '',
                referenceDescription: ''
            };
            vm.references.push(reference);
        }

        function deleteReference(index) {
            if (vm.references.length > 1) {
                vm.references.splice(index, 1);
            } else {
                vm.references.splice(index, 1);
                vm.references.push({
                    fieldType: '',
                    referenceDescription: ''
                });
            }
        }

    }
})();
