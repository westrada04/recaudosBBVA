(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalEdit')
        .controller('FinancialTerminalEditController', FinancialTerminalEditController);

    function FinancialTerminalEditController(FinancialTerminalEditService, ConsultAgreementService, GeneralDataEditService, toastr) {
        var vm = this;
        vm.offices = [];

        //datos obteneidos
        var request = ConsultAgreementService.getFinancialTerminal();
        if (request.type != undefined) {
            vm.type = request.type;
        }

        if (request.allOffices != undefined) {
            vm.allOffices = request.allOffices;
        }

        if (request.statusOffice != undefined) {
            vm.statusOffice = request.statusOffice;
            vm.offices = request.offices;
        } else {
            vm.statusOffice = false;
        }


        if (vm.offices.length == 0) {
            var oficce = {
                officeCode: ''
            };
            vm.offices.push(oficce);
        }

        vm.changeType = changeType;
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

            var requestAgrement = GeneralDataEditService.getRequestAgreement().idAgreement;

            /*if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }*/

            switch (vm.type) {
                case 'NAL':
                    // Todas las Oficinas
                    var requestOffices = {
                        "name": "INDICATOR_OFFICE",
                        "isActive": vm.allOffices == undefined ? false : true,
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
                    if (vm.offices.length > 0) {
                        for (var i = 0; i < vm.offices.length; i++) {
                            valueIndicatorOffice.push({
                                "id": i,
                                "name": vm.offices[i].officeCode
                            });
                        }
                    } else {
                        valueIndicatorOffice.push({
                            id: "",
                            name: ""
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

            vm.myPromise = FinancialTerminalEditService.createIndicatorGeneral(requestOffices, requestOffices.name)
                .then(function (response) {
                    toastr.info('Informacion guardada : ', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }

    }
})();
