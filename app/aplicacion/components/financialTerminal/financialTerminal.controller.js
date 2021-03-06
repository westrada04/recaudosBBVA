(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminal')
        .controller('FinancialTerminalController', FinancialTerminalController);

    function FinancialTerminalController(FinancialTerminalService, GeneralDataService, toastr) {
        var vm = this;

        vm.changeType = changeType;
        vm.statusOffice = false;

        vm.offices = [];

        var oficce = {
            officeCode: ''
        };

        vm.offices.push(oficce);

        vm.addOficce = addOficce;
        vm.deleteOficce = deleteOficce;
        vm.save = save;

        vm.types = [
            {
                nombre: 'Nacional',
                value: 'NAL'
            },
            {
                nombre: 'Oficina',
                value: 'OFI'
            },
            {
                nombre: 'Centro de Servicios',
                value: 'CSR'
            }
        ];

        function changeType() {
            if (vm.type == 'OFI') {
                vm.statusOffice = true;
            } else {
                vm.statusOffice = false;
            }
        }

        function addOficce() {
            var oficce = {
                officeCode: ''
            };

            vm.offices.push(oficce);
        }

        function deleteOficce(index) {
            if (vm.offices.length > 1) {
                vm.offices.splice(index, 1);
            } else {
                vm.offices.splice(index, 1);
                vm.offices.push({
                    officeCode: ''
                });
            }
        }

        function save() {

            var requestAgrement = GeneralDataService.getRequestAgreement().idAgreement;

            /*if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }*/

            switch (vm.type) {
                case 'NAL':
                    // Todas las Oficinas
                    var requestOffices = {
                        "name": "INDICATOR_OFFICE",
                        "isActive": vm.allOffices,
                        "limits": [{
                            start: "",
                            end: ""
                        }],
                        "value": [{
                            id: "",
                            name: ""
                        }]
                    };
                    break;
                case 'OFI':
                    // Oficina revisar 
                    var valueIndicatorOffice = [];
                    for (var i = 0; i < vm.offices.length; i++) {
                        valueIndicatorOffice.push({
                            "id": i,
                            "name": vm.offices[i].officeCode
                        });
                    }

                    var requestOffices = {
                        "name": "OFFICES",
                        "isActive": true,
                        "limits": [{
                            start: "",
                            end: ""
                        }],
                        "value": valueIndicatorOffice
                    };
                    break;
                case 'CSR':
                    // Centro de servicio
                    var requestOffices = {
                        "name": "CENTER_OF_SERVICES",
                        "isActive": true,
                        "limits": [{
                            start: "",
                            end: ""
                        }],
                        "value": [{
                            id: "",
                            name: ""
                        }]
                    };
                    break;
            }

            vm.myPromise = FinancialTerminalService.createIndicatorGeneral(requestOffices, requestOffices.name)
                .then(function (response) {
                    toastr.info('Informacion guardada : ', 'Informacion !');
                    console.log('exito');
                }).catch(function (response) {

                });
        }
    }
})();
