(function () {
    'use strict';

    angular
        .module('app.aplicacion.queryReports')
        .controller('QueryReportsController', QueryReportsController);

    function QueryReportsController($timeout, $state, typeRequest, toastr, QueryReportsService) {
        var vm = this;

        vm.rowCollection = [];
        vm.itemsByPage = 5;
        vm.numberPages = 0;

        vm.satusAudit = false;
        vm.formAudit = {};
        vm.satusStatistical = false;
        vm.formStatistical = {};
        vm.tableStatistical = false;
        vm.satusExisting = false;
        vm.formExisting = {};
        vm.statusCard = false;
        vm.formCard = {};
        vm.statusParametric = false;
        vm.formParametric = {}
        vm.statusRequest = false;
        vm.formRequest = {};
        vm.tableRequest = false;

        vm.changeReportType = changeReportType;
        vm.changeFormStatisticalTypeAgreement = changeFormStatisticalTypeAgreement;
        vm.generateStatistical = generateStatistical;
        vm.clearStatistical = clearStatistical;
        vm.generateRequest = generateRequest;
        vm.cleanRequest = cleanRequest;

        if (typeRequest == 'R') {
            vm.reportTypes = [
                {
                    nombre: 'Informe Estadístico de Convenios',
                    value: 1
                },
                {
                    nombre: 'Informe de Convenios Existentes',
                    value: 2
                },
                {
                    nombre: 'Informe de Parametría del Convenio',
                    value: 3
                },
                {
                    nombre: 'Informe de Solicitudes',
                    value: 4
                },
                {
                    nombre: 'Informe de Auditoría',
                    value: 5
                },
                {
                    nombre: 'Informe de Tarjetas de Recaudo',
                    value: 6
                }
            ];

            vm.formStatistical.typeAgreements = [
                {
                    nombre: 'Recaudos',
                    value: '001'
                },
                {
                    nombre: 'Servicio Publico',
                    value: '002'
                },
                {
                    nombre: 'Impuestos',
                    value: '003'
                }
            ];

        } else if (typeRequest == 'I') {
            vm.reportTypes = [
                {
                    nombre: 'Informe de Convenios Existentes',
                    value: 2
                },
                {
                    nombre: 'Informe de Auditoría',
                    value: 5
                }
            ];

            vm.formStatistical.typeAgreements = [
                {
                    nombre: 'Impuestos Nuevo',
                    value: '005'
                }
            ];
        }

        function changeReportType() {
            switch (vm.reportType) {
                case '1':
                    vm.satusStatistical = true;
                    vm.satusAudit = false;
                    vm.satusExisting = false;
                    vm.statusCard = false;
                    vm.statusParametric = false;
                    vm.statusRequest = false;
                    vm.tableRequest = false;
                    break;
                case '2':
                    vm.satusExisting = true;
                    vm.satusStatistical = false;
                    vm.satusAudit = false;
                    vm.statusCard = false;
                    vm.statusParametric = false;
                    vm.statusRequest = false;
                    vm.tableStatistical = false;
                    vm.tableRequest = false;
                    break;
                case '3':
                    vm.statusParametric = true;
                    vm.satusAudit = false;
                    vm.satusStatistical = false;
                    vm.satusExisting = false;
                    vm.statusCard = false;
                    vm.statusRequest = false;
                    vm.tableStatistical = false;
                    vm.tableRequest = false;
                    break;
                case '4':
                    vm.statusRequest = true;
                    vm.statusParametric = false;
                    vm.satusAudit = false;
                    vm.satusStatistical = false;
                    vm.satusExisting = false;
                    vm.statusCard = false;
                    vm.tableStatistical = false;
                    break;
                case '5':
                    vm.satusAudit = true;
                    vm.satusStatistical = false;
                    vm.satusExisting = false;
                    vm.statusCard = false;
                    vm.statusParametric = false;
                    vm.statusRequest = false;
                    vm.tableStatistical = false;
                    vm.tableRequest = false;
                    break;
                case '6':
                    vm.statusCard = true;
                    vm.satusAudit = false;
                    vm.satusStatistical = false;
                    vm.satusExisting = false;
                    vm.statusParametric = false;
                    vm.statusRequest = false;
                    vm.tableStatistical = false;
                    vm.tableRequest = false;
                    break;
                default:
                    vm.statusCard = false;
                    vm.satusAudit = false;
                    vm.satusStatistical = false;
                    vm.satusExisting = false;
                    vm.statusParametric = false;
                    vm.statusRequest = false;
                    vm.tableStatistical = false;
                    vm.tableRequest = false;
                    break;
            }
        }

        function changeFormStatisticalTypeAgreement() {
            vm.formStatistical.agreementClases = [];
            if (vm.formStatistical.typeAgreement == '005') {
                vm.formStatistical.agreementClases = [
                    {
                        nombre: 'Departamental',
                        value: '002'
                    }
                ];
            } else {
                vm.formStatistical.agreementClases = [
                    {
                        nombre: '000',
                        value: '000'
                    }
                ];
            }
        }

        function generateStatistical() {
            var agreementNumber = '';
            if (vm.formStatistical.typeAgreement != undefined && vm.formStatistical.codeAgreement != undefined && vm.formStatistical.agreementClass != undefined) {
                var numero = "";
                for (var i = vm.formStatistical.codeAgreement.length; i < 7; i++) {
                    numero = numero + "0";
                }
                numero = numero + "" + vm.formStatistical.codeAgreement;
                agreementNumber = vm.formStatistical.typeAgreement + "" + numero + "" + vm.formStatistical.agreementClass;
            }

            vm.myPromise = QueryReportsService.getReportStatistical(agreementNumber, vm.formStatistical.numberRequest, vm.formStatistical.identificationNumber, vm.formStatistical.startDate, vm.formStatistical.finalDate)
                .then(function (response) {
                        vm.rowCollection = response;
                        vm.tableStatistical = true;
                        var items = Object.keys(vm.rowCollection).length;
                        if (items != 0) {
                            var numberPages = (items / vm.itemsByPage);

                            if (numberPages - Math.trunc(numberPages) > 0) {
                                vm.numberPages = Math.trunc(numberPages) + 1;
                            }
                        }
                        toastr.info('Consulta realizada con exito. <br> Numero de registros: ' + vm.rowCollection.length, 'Informacion !');
                    },
                    function (error) {
                        vm.tableData = false;
                        toastr.error('Consulta no realizada exitosamente <br>' + error.data["error-message"], 'Error !');
                    });
        }

        function clearStatistical() {
            vm.rowCollection = [];
            vm.formStatistical = {};
            vm.tableStatistical = false;
        }

        function generateRequest() {

            vm.myPromise = QueryReportsService.getRequest(vm.formRequest.executive, vm.formRequest.state, vm.formRequest.identificationNumber, vm.formRequest.creationDate, vm.formRequest.endDate)
                .then(function (response) {
                        vm.rowCollection = response.data;
                        vm.tableRequest = true;
                        var items = Object.keys(vm.rowCollection).length;
                        if (items != 0) {
                            var numberPages = (items / vm.itemsByPage);
                            if (numberPages - Math.trunc(numberPages) > 0) {
                                vm.numberPages = Math.trunc(numberPages) + 1;
                            }
                        }
                        toastr.info('Consulta realizada con exito. <br> Numero de registros: ' + vm.rowCollection.length, 'Informacion !');
                    },
                    function (error) {
                        vm.tableRequest = false;
                        toastr.error('Consulta no realizada exitosamente <br>' + error.data["error-message"], 'Error !');
                    });
        }

        function cleanRequest() {
            vm.rowCollection = [];
            vm.formRequest = {};
            vm.tableRequest = false;
        }
    }
})();
