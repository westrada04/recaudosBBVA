(function () {
    'use strict';

    angular
    .module('app.aplicacion.consultRequestForm')
    .controller('ConsultRequestFormController', ConsultRequestFormController);

    function ConsultRequestFormController($timeout, $state, typeRequest, ConsultRequestService, $scope, toastr) {
        var vm = this;
        vm.createRequest = createRequest;
        vm.editRequest = editRequest;
        vm.consultRequest = consultRequest;
        vm.myPromise;
        vm.rowCollection = [];
        vm.itemsByPage = 5;
        vm.numberPages = 0;
        vm.tableData = false;
        vm.detail = detail;

        vm.changeIdentificationType = changeIdentificationType;
        vm.changeTypeAgreement = changeTypeAgreement;
        vm.changeTypeRequest = changeTypeRequest;
        vm.continuar = continuar;
        vm.clean = clean;

        vm.stateIdentificacion = false;
        vm.stateTypeAgreement = false;
        vm.stateTypeRequest = false;
        vm.stateDescription = false;
        vm.stateVer = false;

        $scope.$watch("vm.agreementDescription", function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            if (newValue == undefined) {
                vm.stateIdentificacion = false;
                vm.stateTypeAgreement = false;
                vm.stateTypeRequest = false;
            }

            if (newValue != '' && newValue != undefined) {
                vm.stateIdentificacion = true;
                vm.stateTypeAgreement = true;
                vm.stateTypeRequest = true;
            }
        });

        vm.identificationTypes = [
        {
            nombre: "Cédula",
            value: "01"
        },
        {
            nombre: "Cédula de Extranjería",
            value: "02"
        },
        {
            nombre: "NIT",
            value: "03"
        }
        ];

        
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

        vm.classAgreements = [
        {
            nombre: "000",
            value: "000"
        },
        {
            nombre: "Departamental",
            value: "002"
        }
        ];

        vm.typeRequests = [
        {
            nombre: "Solicitud",
            value: "200"
        },
        {
            nombre: "Recaudo Nacional",
            value: "01"
        },
        {
            nombre: "Servicos Publicos",
            value: "02"
        },
        {
            nombre: "Recaudo de Impuestos",
            value: "05"
        }
        ];

        

        function createRequest() {
            $timeout(function () {
                $state.go('templateAuth.createRequest');
            });
        }

        function editRequest() {
            $timeout(function () {
                $state.go('templateAuth.editRequestForm');
            });
        }

        function consultRequest() {
            $timeout(function () {
                $state.go('templateAuth.consultRequestForm');
            });
        }

        function changeIdentificationType() {
            if (vm.identificationType != '') {
                vm.stateTypeAgreement = true;
                vm.stateTypeRequest = true;
                vm.stateDescription = true;

                if (vm.identificationType == '03') {
                    vm.stateVer = true;
                } else {
                    vm.stateVer = false;
                }

            } else {
                vm.stateTypeAgreement = false;
                vm.stateTypeRequest = false;
                vm.stateDescription = false;
                vm.stateVer = false;
            }
        }

        function changeTypeAgreement() {

            if (vm.typeAgreement != '') {
                vm.stateIdentificacion = true;
                vm.stateTypeRequest = true;
                vm.stateDescription = true;

                if (vm.typeAgreement == '005') {
                    vm.classAgreements = [
                    {
                        nombre: "Departamental",
                        value: "002"
                    }
                    ];
                }
            } else {
                vm.stateIdentificacion = false;
                vm.stateTypeRequest = false;
                vm.stateDescription = false;
                vm.classAgreements = [
                {
                    nombre: "000",
                    value: "000"
                },
                {
                    nombre: "Departamental",
                    value: "002"
                }
                ];
            }

        }

        function changeTypeRequest() {
            if (vm.typeRequest != '') {
                vm.stateIdentificacion = true;
                vm.stateTypeAgreement = true;
                vm.stateDescription = true;
            } else {
                vm.stateIdentificacion = false;
                vm.stateTypeAgreement = false;
                vm.stateDescription = false;
            }
        }

        function continuar() {
            if (!vm.stateTypeAgreement) {
                var form = {
                    typeAgreement: vm.typeAgreement,
                    agreementCode: vm.agreementCode,
                    classAgreement: vm.classAgreement
                }
                vm.myPromise = ConsultRequestService.getRequestTypeAgreement(form)
                .then(function (response) {
                    vm.rowCollection = response.data;
                    vm.tableData = true;
                    toastr.info('Consulta realizada con exito. <br> Numero de registros: 1', 'Informacion !');
                },
                function (error) {
                    vm.tableData = false;
                    toastr.error('Consulta no realizada exitosamente <br>' + error.data["error-message"], 'Error !');
                });
            } else if (!vm.stateIdentificacion) {
                var form = {
                    identificationType: vm.identificationType,
                    identificationNumber: vm.identificationNumber,
                    ver: vm.ver
                }
                vm.myPromise = ConsultRequestService.getRequestIdentificacion(form)
                .then(function (response) {
                    vm.rowCollection = response.data;
                    vm.tableData = true;
                    var items = Object.keys(vm.rowCollection).length;

                    if (items != 0) {
                        var numberPages = (items / vm.itemsByPage);

                        if (numberPages - Math.trunc(numberPages) > 0) {
                            vm.numberPages = Math.trunc(numberPages) + 1;
                        }
                    }
                    toastr.info('Consulta realizada con exito. <br> Numero de registros: ' + items, 'Informacion !');
                },
                function (error) {
                    vm.tableData = false;
                    toastr.error('Consulta no realizada exitosamente <br>' + error.data["error-message"], 'Error !');
                });
            } else if (!vm.stateTypeRequest) {
                var form = {
                    typeRequest: vm.typeRequest,
                    requestNumber: vm.requestNumber
                }
                vm.myPromise = ConsultRequestService.getRequestTypeRequest(form)
                .then(function (response) {
                    vm.rowCollection = response.data;
                    vm.tableData = true;

                    toastr.info('Consulta realizada con exito. <br> Numero de registros: 1', 'Informacion !');
                }, function (error) {
                    vm.tableData = false;
                    toastr.error('Consulta no realizada exitosamente <br>' + error.data["error-message"], 'Error !');
                });
            } else if (!vm.stateDescription) {
                var form = {
                    agreementDescription: vm.agreementDescription
                }
                vm.myPromise = ConsultRequestService.getRequestDescription(form)
                .then(function (response) {
                    vm.rowCollection = response.data;
                    vm.tableData = true;
                    var items = Object.keys(vm.rowCollection).length;

                    if (items != 0) {
                        var numberPages = (items / vm.itemsByPage);
                        if (numberPages - Math.trunc(numberPages) > 0) {
                            vm.numberPages = Math.trunc(numberPages) + 1;
                        }
                    }
                    toastr.info('Consulta realizada con exito. <br> Numero de registros: ' + items, 'Informacion !');

                }, function (error) {
                    vm.tableData = false;
                    toastr.error('Consulta no realizada exitosamente <br>' + error.data["error-message"], 'Error !');
                });
            }
        }

        function clean() {
            vm.stateIdentificacion = false;
            vm.stateTypeAgreement = false;
            vm.stateTypeRequest = false;
            vm.stateDescription = false;
            vm.stateVer = false;
            vm.identificationType = "";
            vm.identificationNumber = "";
            vm.typeAgreement = "";
            vm.agreementCode = "";
            vm.classAgreement = "";
            vm.typeRequest = "";
            vm.requestNumber = "";
            vm.agreementDescription = "";
            vm.tableData = false;
            vm.rowCollection = [];
        }

        function detail(idAgreement) {
            var x = '';
            if (idAgreement.length < 13) {
                var dif = 13 - idAgreement.length;
                for (var i = 0; i < dif; i++) {
                    x = x + '0';
                }
            }

            idAgreement = x + idAgreement;

            $timeout(function () {
                $state.go('templateAuth.consultAgreement', {
                    idAgreement: idAgreement
                });
            });
        }
    }
})();
