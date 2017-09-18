(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.atm')
        .controller('AtmController', AtmController);

    function AtmController(CreateAgreementService, toastr) {
        var vm = this;

        vm.typeRequest = CreateAgreementService.getTypeRequest();

        vm.save = save;

        if (vm.typeRequest == 'R') {
            vm.categories = [
                {
                    nombre: 'Servicios Públicos',
                    value: '001'
                },
                {
                    nombre: 'Telefonía Celular',
                    value: '002'
                },
                {
                    nombre: 'TV Satelital y Cable',
                    value: '003'
                },
                {
                    nombre: 'Comercialización de productos',
                    value: '004'
                },
                {
                    nombre: 'Seguros',
                    value: '005'
                },
                {
                    nombre: 'Comercialización de Servicios',
                    value: '006'
                },
                {
                    nombre: 'Pensiones, Cesantías y ARP',
                    value: '007'
                },
                {
                    nombre: 'Fiduciarias',
                    value: '008'
                },
                {
                    nombre: 'Fondos de Empleados',
                    value: '009'
                },
                {
                    nombre: 'Impuestos',
                    value: '010'
                },
                {
                    nombre: 'Otros Pagos',
                    value: '011'
                },
                {
                    nombre: 'Salud',
                    value: '012'
                },
                {
                    nombre: 'Educación',
                    value: '013'
                }
            ];

        } else if (vm.typeRequest == 'I') {
            vm.categories = [
                {
                    nombre: 'Impuestos',
                    value: '010'
                }
            ];

        }

        vm.actions = [
            {
                nombre: 'Creación Convenios Nuevo ATM',
                value: 'I'
            },
            {
                nombre: 'Modificación',
                value: 'U'
            },
            {
                nombre: 'Cancelación',
                value: 'D'
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
            },
            {
                nombre: 'Cali',
                value: '003'
            },
            {
                nombre: 'Barranquilla',
                value: '004'
            },
            {
                nombre: 'Costa Atlántica',
                value: '006'
            },
            {
                nombre: 'Pereira',
                value: '007'
            },
            {
                nombre: 'Neiva',
                value: '008'
            },
            {
                nombre: 'Manizales',
                value: '009'
            },
            {
                nombre: 'Bucaramanga',
                value: '010'
            },
            {
                nombre: 'Cúcuta',
                value: '011'
            },
            {
                nombre: 'Cartagena',
                value: '012'
            },
            {
                nombre: 'Facatativá',
                value: '013'
            },
            {
                nombre: 'Villavicencio',
                value: '015'
            },
            {
                nombre: 'Pasto',
                value: '023'
            },
            {
                nombre: 'Todo el país',
                value: '099'
            }
        ];

        function save() {
            toastr.info('Modulo no Implementado', 'Informacion !');
        }
    }
})();
