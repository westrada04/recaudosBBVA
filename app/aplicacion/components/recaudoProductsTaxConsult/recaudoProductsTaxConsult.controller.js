(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.recaudoProductsTaxConsult')
        .controller('RecaudoProductsTaxConsultController', RecaudoProductsTaxConsultController);

    function RecaudoProductsTaxConsultController(RecaudoProductsTaxService, toastr) {
        var vm = this;

        vm.changeProduct = changeProduct;
        vm.statusSubproduct = false;
        vm.save = save;

        vm.classes = [
            {
                nombre: 'Departamentales',
                value: '002'
        },
            {
                nombre: 'Municipales',
                value: '003'
        }
        ];

        vm.products = [
            {
                nombre: 'Cuenta Corriente',
                value: '01'
        },
            {
                nombre: 'Cuenta de Ahorros',
                value: '02'
        }
        ];

        function changeProduct() {

            if (vm.product == '') {

                vm.statusSubproduct = false;
                vm.nameSubproduct = '';
                vm.subproducts = [];

            } else if (vm.product == '01') {

                vm.statusSubproduct = true;
                vm.nameSubproduct = 'Subproducto CTA CTE';

                vm.subproducts = [
                    {
                        nombre: 'Cta Cte',
                        value: '0001'
                },
                    {
                        nombre: 'Cta Cte Remunerada',
                        value: '0002'
                },
                    {
                        nombre: 'Cta Crédito',
                        value: '0003'
                },
                    {
                        nombre: 'Cta Cte Especial',
                        value: '0004'
                },
                    {
                        nombre: 'Cta Cte Prepactada',
                        value: '0005'
                },
                    {
                        nombre: 'Cta Comercio',
                        value: '0006'
                },
                    {
                        nombre: 'Cta Crédito Comercio',
                        value: '0007'
                },
                    {
                        nombre: 'Cta Cte Rentable Plus',
                        value: '008'
                },
                    {
                        nombre: 'Agrocuenta',
                        value: '010'
                },
                    {
                        nombre: 'Cta Ecopetrol',
                        value: '011'
                },
                    {
                        nombre: 'Cta Cte C.N.B',
                        value: '012'
                },
                    {
                        nombre: 'Cta Cte Remunerada Persona Natura',
                        value: '013'
                }
                ];
            } else if (vm.product == '02') {

                vm.statusSubproduct = true;
                vm.nameSubproduct = 'Subproducto CTA Ahorros';

                vm.subproducts = [
                    {
                        nombre: 'Cuenta Ahorro Diario',
                        value: '0001'
                },
                    {
                        nombre: 'Ahorros Tradicional',
                        value: '0002'
                },
                    {
                        nombre: 'El Libreton BBVA',
                        value: '0003'
                },
                    {
                        nombre: 'Programado para Vivienda',
                        value: '0004'
                },
                    {
                        nombre: 'Ahorros Especial',
                        value: '0005'
                },
                    {
                        nombre: 'Cuenta Ahorros Prepactada',
                        value: '0006'
                },
                    {
                        nombre: 'Cuenta de Ahorros AFC',
                        value: '0007'
                },
                    {
                        nombre: 'Ahorros Empresas T.V',
                        value: '008'
                },
                    {
                        nombre: 'Ahorros PREF  T.V.BCA EMP INST',
                        value: '009'
                },
                    {
                        nombre: 'Ahorros Emp',
                        value: '010'
                },
                    {
                        nombre: 'Cta de Ahorros Empresarial',
                        value: '011'
                },
                    {
                        nombre: 'Cta AHS Pensional Colpensiones',
                        value: '012'
                },
                    {
                        nombre: 'Blue BBVA',
                        value: '013'
                },
                    {
                        nombre: 'Cta Ahorros Pensional BBVA',
                        value: '014'
                },
                    {
                        nombre: 'Cta Mi Proyecto',
                        value: '016'
                },
                    {
                        nombre: 'Cta Ahorro Fijo',
                        value: '017'
                },
                    {
                        nombre: 'Cta Ahorros Blue Kids Niños',
                        value: '018'
                },
                    {
                        nombre: 'Cta Ahorros Blue Kids Niñas',
                        value: '019'
                },
                    {
                        nombre: 'Ahorro Diario Empleados',
                        value: '020'
                },
                    {
                        nombre: 'Electrónica',
                        value: '021'
                },
                    {
                        nombre: 'CDAT',
                        value: '022'
                },
                    {
                        nombre: 'Ahorros EV Colombia',
                        value: '024'
                },
                    {
                        nombre: 'Cta FAC Colombia',
                        value: '025'
                }
                ];
            }
        }

        function save() {

            // Producto
            var requestProduct = {
                "name": "PRODUCT",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.product,
                    name: vm.product
                }],
            };
            // subproducto
            var requestBy_Product = {
                "name": "BY_PRODUCT",
                "isActive": true,
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: "BY_PRODUCT",
                    name: vm.subproduct
                }],
            };

            vm.myPromise = RecaudoProductsTaxService.createIndicatorGen(requestProduct, requestProduct.name)
                .then(function (repsonse) {
                    return RecaudoProductsTaxService.createIndicatorGen(requestBy_Product, requestBy_Product.name);
                }).then(function (response) {
                    toastr.info('Registros Exitosos!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso', 'Error');
                    console.log("error", error);
                });


        }
    }
})();
