(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileAuthorizer')
        .controller('OutputFileAuthorizerController', OutputFileAuthorizerController);

    function OutputFileAuthorizerController($scope, ConsultAgreementService, OutputFileEditService, GeneralDataEditService, toastr) {
        var vm = this;

        vm.automaticFiles = [];
        vm.disable = true;
        vm.success = false;

        //datos traidos
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        var request = ConsultAgreementService.getOutputFile();
        vm.partialTransfer = request.partialTransfer;
        vm.outputFileType = request.outputFileType;
        vm.formatType = request.formatType;
        vm.periodicityReport = request.periodicityReport;
        vm.periodicityFile = request.periodicityFile;
        vm.fileGeneration = request.fileGeneration;
        vm.minPeriodicity = request.minPeriodicity;
        vm.specialAgreement = request.specialAgreement;
        vm.channelReport = request.channelReport;
        vm.autoSendFile = request.autoSendFile;
        vm.destination = request.destination;
        vm.inputPositionBd = request.inputPositionBd;
        vm.longitudeEnd = request.longitudeEnd;
        vm.longitudeInit = request.longitudeInit;
        vm.automaticFiles = request.notifications;

        if (vm.automaticFiles == 0) {
            var automaticFile = {
                email: '',
                secureEmail: '',
                compressedType: '',
                emailNotification: ''
            };
            vm.automaticFiles.push(automaticFile);
        }

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

        vm.changeOutputFileType = changeOutputFileType;
        vm.addAutomaticFile = addAutomaticFile;
        vm.deleteAutomaticFile = deleteAutomaticFile;
        vm.checkSave = checkSave;
        vm.save = save;

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
                nombre: "Ninguno",
                value: "N"
        },
            {
                nombre: "Total",
                value: "T"
        }
        ];

        function changeOutputFileType() {
            OutputFileEditService.setOutputFileType(vm.outputFileType);
        }

        function addAutomaticFile() {
            vm.automaticFiles.push({
                email: '',
                secureEmail: '',
                compressedType: '',
                emailNotification: ''
            });
        }

        function deleteAutomaticFile(index) {
            if (vm.automaticFiles.length > 1) {
                vm.automaticFiles.splice(index, 1);
            } else {
                vm.automaticFiles.splice(index, 1);
                vm.automaticFiles.push({
                    email: '',
                    secureEmail: '',
                    compressedType: '',
                    emailNotification: ''
                });
            }
        }

        function checkSave(outputFile) {
            if (vm.success || outputFile.$valid) {
                return false;
            } else {
                return true;
            }
        }

        function save() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement();

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            if (vm.fileGeneration) {

                // Generación de Archivo
                var requestGeneration_File = {
                    "name": "GENERATION_FILE",
                    "isActive": vm.fileGeneration,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.fileGeneration ? "S" : "",
                        name: vm.periodicityFile ? "S" : ""
                    }],
                };

                // REPORT_FREQUENCY
                var requestReport_Frecuency = {
                    "name": "REPORT_FREQUENCY",
                    "isActive": true,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.periodicityReport,
                        name: vm.periodicityReport
                    }],
                };

                // periodicityFile
                var requestUpdate_Cyclos = {
                    "name": "UPDATE_CYCLOS",
                    "isActive": true,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.partialTransfer,
                        name: vm.partialTransfer
                    }],
                };

                // DELIVERY_FREQUENCY OJO VALIDAR VARIABLE
                var requestDelivery_Frequency = {
                    "name": "DELIVERY_FREQUENCY",
                    "isActive": true,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.periodicityFile,
                        name: vm.periodicityFile
                    }],
                };

                // Convenio Especial
                var requestSpecial_Agreement = {
                    "name": "SPECIAL_AGREEMENT",
                    "isActive": vm.specialAgreement,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: "",
                        name: ""
                    }],
                };

                // Informe por Canal
                var requestChannel_Repor = {
                    "name": "CHANNEL_REPORT",
                    "isActive": vm.specialAgreement,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.specialAgreement ? vm.channelReport : "",
                        name: vm.specialAgreement ? vm.channelReport : ""
                    }],
                };

                // Periodicidad Mín
                var requestMinimum_Periodicity = {
                    "name": "MINIMUM_PERIODICITY",
                    "isActive": vm.specialAgreement,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.specialAgreement ? vm.minPeriodicity : "",
                        name: vm.specialAgreement ? vm.minPeriodicity : ""
                    }],
                };

                // Envío archivo automático
                var requestSend_Automatic_Archi = {
                    "name": "SEND_AUTOMATIC_ARCHI",
                    "isActive": vm.autoSendFile,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: "",
                        name: ""
                    }],
                };

                // Tipo Archivo Salida
                var requestStructure = {
                    "name": "STRUCTURE",
                    "isActive": vm.outputFileType != "" ? true : false,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.outputFileType,
                        name: vm.outputFileType
                    }],
                };

                // Tipo de Formato
                var requestOutput_Format = {
                    "name": "OUTPUT_FORMAT",
                    "isActive": vm.formatType != "" ? true : false,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.formatType,
                        name: vm.formatType
                    }],
                };

                // Destino
                var requestDestination_Output_F = {
                    "name": "DESTINATION_OUTPUT_F",
                    "isActive": vm.destination != undefined ? true : false,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.destination != undefined ? vm.destination.substring(0, 1) : "",
                        name: vm.destination != undefined ? vm.destination.substring(0, 1) : ""
                    }],
                };

                // Posición Entrada BD
                var requestOutput_Bd_Input_Posi = {
                    "name": "OUTPUT_BD_INPUT_POSI",
                    "isActive": vm.inputPositionBd,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: vm.inputPositionBd ? "S" : "",
                        name: vm.inputPositionBd ? "S" : ""
                    }],
                };

                // Longitud
                var dato1 = vm.longitudeInit;
                var dato2 = vm.longitudeEnd;
                if (dato1 != undefined && dato2 != undefined) {
                    if (dato1.toString().length == 1 && dato1 < 9) {
                        dato1 = "0" + dato1;
                    }
                    if (dato2.toString().length == 1 && dato2 < 9) {
                        dato2 = "0" + dato2;
                    }
                    dato1 = dato1 + "/" + dato2;
                } else {
                    dato1 = "";
                }
                var requestLenght = {
                    "name": "LENGTH",
                    "isActive": vm.longitudeInit != undefined && vm.longitudeEnd != undefined ? true : false,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: dato1,
                        name: dato1
                    }],
                };

                // agreement

                if (vm.statusAutoSendFile) {
                    angular.forEach(vm.automaticFiles, function (value, key) {
                        requestAgrement.notifications.push({
                            "notificationsType": {
                                "id": "01",
                                "name": "EMAIL  P",
                            },
                            "receiver": {
                                "receiverType": {
                                    "id": "1",
                                    "name": "Cliente"
                                },
                                "value": value.email,
                                "name": value.email
                            },
                            "typeReport": {
                                "id": "1",
                                "name": value.emailNotification.length > 20 ? value.emailNotification.substring(0, 20) : value.emailNotification,
                                "typeTax": {
                                    "id": "1",
                                    "name": "DEPARTAMENTAL"
                                }
                            },
                            "nameTax": value.emailNotification.length > 15 ? value.emailNotification.substring(0, 15) : value.emailNotification
                        });
                    });
                }

                vm.myPromise = OutputFileEditService.createIndicatorGeneral(requestReport_Frecuency, 'REPORT_FREQUENCY')
                    .then(function (repsonse) {
                        return OutputFileEditService.createIndicatorGeneral(requestUpdate_Cyclos, 'UPDATE_CYCLOS');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestDelivery_Frequency, 'DELIVERY_FREQUENCY');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestGeneration_File, 'GENERATION_FILE');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestSpecial_Agreement, 'SPECIAL_AGREEMENT');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestChannel_Repor, 'CHANNEL_REPORT');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestMinimum_Periodicity, 'MINIMUM_PERIODICITY');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestSend_Automatic_Archi, 'SEND_AUTOMATIC_ARCHI');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestStructure, 'STRUCTURE');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestOutput_Format, 'OUTPUT_FORMAT');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestDestination_Output_F, 'DESTINATION_OUTPUT_F');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestOutput_Bd_Input_Posi, 'OUTPUT_BD_INPUT_POSI');
                    }).then(function (response) {
                        return OutputFileEditService.createIndicatorGeneral(requestLenght, 'LENGTH');
                    }).then(function (response) {
                        if (vm.statusAutoSendFile) {
                            return OutputFileEditService.createAgreement(requestAgrement);
                        } else {
                            return true;
                        }
                    }).then(function (response) {
                        toastr.info('Registros Exitosos!', 'Informacion !');
                        GeneralDataEditService.setRequestAgreement(requestAgrement);
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });

            } else {

                var requestGeneration_File = {
                    "name": "GENERATION_FILE",
                    "isActive": vm.fileGeneration,
                    "limits": [{
                        start: "",
                        end: ""
                    }],
                    "value": [{
                        id: "",
                        name: ""
                    }],
                };

                vm.myPromise = OutputFileEditService.createIndicatorGeneral(requestGeneration_File, requestGeneration_File.name)
                    .then(function (response) {
                        toastr.info('Guardado correctamente!', 'Informacion !');
                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });
            }
        }

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
                vm.disable = true;
            } else {
                vm.disable = false;
                vm.success = false;
            }
        });
    }
})();
