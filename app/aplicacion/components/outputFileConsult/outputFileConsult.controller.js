(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileConsult')
        .controller('OutputFileConsultController', OutputFileConsultController);

    function OutputFileConsultController($scope, CreateAgreementService, ConsultAgreementService, toastr) {
        var vm = this;
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        var requestOutputFile = ConsultAgreementService.getOutputFile();

        vm.disable = true;
        vm.automaticFiles = [];
        var automaticFile = {
            email: '',
            secureEmail: '',
            compressedType: '',
            emailNotification: ''
        };
        vm.automaticFiles = requestOutputFile.notifications;

        vm.success = false;

        vm.partialTransfer = requestOutputFile.partialTransfer;
        vm.outputFileType = requestOutputFile.outputFileType;
        vm.formatType = requestOutputFile.formatType;
        vm.periodicityReport = requestOutputFile.periodicityReport;
        vm.periodicityFile = requestOutputFile.periodicityFile;
        vm.fileGeneration = requestOutputFile.fileGeneration;
        vm.minPeriodicity = requestOutputFile.minPeriodicity;
        vm.specialAgreement = requestOutputFile.specialAgreement;
        vm.channelReport = requestOutputFile.channelReport;
        vm.autoSendFile = requestOutputFile.autoSendFile;
        vm.destination = requestOutputFile.destination;
        vm.inputPositionBd = requestOutputFile.inputPositionBd;
        vm.longitudeEnd = requestOutputFile.longitudeEnd;
        vm.longitudeInit = requestOutputFile.longitudeInit;

        if (vm.inputPositionBd) {
            vm.statusInputPositionBd = true;
        } else {
            vm.statusInputPositionBd = false;
        }
        
        if (vm.specialAgreement) {
            vm.statusSpecialAgreement = true;
        } else {
            vm.statusSpecialAgreement = false;
        }
        
        if (vm.autoSendFile) {
            vm.statusAutoSendFile = true;
        } else {
            vm.statusAutoSendFile = false;
        }

        if (vm.typeRequest == 'R') {
            vm.isCollection = true;
        } else if (vm.typeRequest == 'I') {
            vm.isCollection = false;
        }

        vm.outputFileTypes = [
            {
                nombre: "ESTANDAR BBVA",
                value: "01"
        },
            {
                nombre: "ASOBANCARIA 1998",
                value: "02"
        },
            {
                nombre: "ASOBANCARIA 2000",
                value: "03"
        },
            {
                nombre: "ASOBANCARIA 2001",
                value: "04"
        },
            {
                nombre: "ASOBANCARIA 2011",
                value: "09"
        }
        ];

        vm.formatTypes = [
            {
                nombre: "ERNAL",
                value: "1"
        },
            {
                nombre: "ERECA",
                value: "2"
        }
        ];

        vm.periodicityReports = [
            {
                nombre: "Diario",
                value: "D"
        },
            {
                nombre: "Mensual",
                value: "M"
        },
            {
                nombre: "Ambos",
                value: "A"
        },
            {
                nombre: "Ninguno",
                value: "N"
        }
        ];

        vm.periodicityFiles = [
            {
                nombre: "Anual",
                value: "A"
        },
            {
                nombre: "Mensual",
                value: "M"
        },
            {
                nombre: "Diario (Automatico)",
                value: "D"
        }
        ];

        vm.destinations = [
            {
                nombre: "FTP",
                value: "FTP"
        },
            {
                nombre: "CASH",
                value: "C"
        }
        ];

        vm.partialTransfers = [
            {
                nombre: "Acumulado",
                value: "A"
        },
            {
                nombre: "Incremental",
                value: "I"
        },
            {
                nombre: "Parcial",
                value: "P"
        },
            {
                nombre: "Total",
                value: "T"
        }
        ];


        $scope.$watch('vm.specialAgreement', function (value) {
            if (vm.specialAgreement == true) {
                vm.statusSpecialAgreement = true;
            } else {
                vm.statusSpecialAgreement = false;
            }
        });

        $scope.$watch('vm.inputPositionBd', function (value) {
            if (vm.inputPositionBd == true) {
                vm.statusInputPositionBd = true;
            } else {
                vm.statusInputPositionBd = false;
            }
        });

        $scope.$watch('vm.autoSendFile', function (value) {
            if (vm.autoSendFile == true) {
                vm.statusAutoSendFile = true;
            } else {
                vm.statusAutoSendFile = false;
            }
        });

        $scope.$watch('vm.fileGeneration', function (value) {
            if (vm.fileGeneration == false) {
                vm.success = true;
            } else {
                vm.success = false;
            }
        });
    }
})();
