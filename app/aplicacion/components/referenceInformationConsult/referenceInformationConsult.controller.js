(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformationConsult')
        .controller('ReferenceInformationConsultController', ReferenceInformationConsultController);

    function ReferenceInformationConsultController(CreateAgreementService, ConsultAgreementService, toastr, ReferenceInformationService, OutputFileService) {
        var vm = this;
        vm.changeType = changeType;
        vm.save = save;
        var requestreferences = ConsultAgreementService.getReferencesInf();
        vm.typeRequest = ConsultAgreementService.gettypeRequest();

        vm.references = requestreferences.references;
        vm.additionals = requestreferences.additionals;
        vm.fixedValues = requestreferences.fixedValues;
        vm.dates = requestreferences.dates;
        vm.values = requestreferences.values; 
        vm.informationMessage = requestreferences.informationMessage;
        vm.type = 'REF';

        if (vm.typeRequest == 'R') {
            vm.isTax = false;
        } else if (vm.typeRequest == 'I') {
            vm.isTax = true;
        }

        var reference = {
            id: 1,
            referenceId: '01000',
            description: '',
            format: '',
            fieldLength: '',
            barLength: '',
            obligatoryField: '',
            inputPosition: 0,
            outputPosition: '',
            fillCharacter: '',
            quickHelp: '',
            alignment: '',
            municipalityField: '',
            taxOver: '',
            routineValidation: ''
        };

        var additional = {
            id: 1,
            referenceId: '02000',
            description: '',
            format: '',
            fieldLength: '',
            obligatoryField: '',
            inputPosition: 0,
            outputPosition: '',
            fillCharacter: '',
            quickHelp: '',
            alignment: '',
            municipalityField: '',
            taxOver: '',
            routineValidation: ''
        };

        var fixedValue = {
            id: 1,
            referenceId: '05000',
            description: '',
            consecutive: '',
            format: '',
            fieldLength: '',
            amountIndicator: '',
            obligatoryField: '',
            minimumAmount: '',
            maximumAmount: ''
        };

        var date = {
            referenceId: '04000',
            description: '',
            format: '',
            inputPosition: '',
            fieldLength: 8,
            alignment: '',
            fillCharacter: '',
            lengthBars: 8,
            quickHelp: ''
        };

        var value = {
            referenceId: '03000',
            description: '',
            format: '',
            inputPosition: '',
            fieldLength: '',
            alignment: '',
            fillCharacter: '',
            lengthBars: '',
            quickHelp: ''
        };

        var message = {
            referenceId: '06000',
            referenceDescription: '',
            longDescription: ''
        };

        vm.addReference = addReference;
        vm.deleteReference = deleteReference;
        vm.addAdditional = addAdditional;
        vm.deleteAdditional = deleteAdditional;
        vm.addFixedValue = addFixedValue;
        vm.deleteFixedValue = deleteFixedValue;
        vm.addDate = addDate;
        vm.deleteDate = deleteDate;
        vm.addValue = addValue;
        vm.deleteValue = deleteValue;
        vm.deleteInformationMessage = deleteInformationMessage;

        vm.stateReference = true;
        vm.stateAdditional = false;
        vm.stateFixedValue = false;
        vm.stateDate = false;       
        vm.stateValue = false;
        vm.stateInformationMessage = false;

        vm.types = [
            {
                nombre: 'Referencia',
                value: 'REF'
            },
            {
                nombre: 'Adicional',
                value: 'ADI'
            },
            {
                nombre: 'Valor Fijo',
                value: 'VAF'
            },
            {
                nombre: 'Fecha',
                value: 'FEC'
            },
            {
                nombre: 'Valor',
                value: 'VAL'
            },
            {
                nombre: 'Mensaje',
                value: 'MSJ'
            }
        ];

        vm.referenceObligatoryFields = [
            {
                nombre: 'Si',
                value: 1
            },
            {
                nombre: 'No',
                value: 0
            }
        ];

        vm.referenceFormats = [
            {
                nombre: 'AlfaNúmerico',
                value: 'A'
            },
            {
                nombre: 'Númerico',
                value: 'N'
            },
            {
                nombre: 'Fecha (AAAAMMDD)',
                value: 'D1'
            },
            {
                nombre: 'Fecha (DDMMAAAA)',
                value: 'D2'
            }
        ];

        vm.referenceFillCharacters = [
            {
                nombre: 'Ceros',
                value: '1'
            },
            {
                nombre: 'Espacios',
                value: '2'
            }
        ];

        vm.referenceAlignments = [
            {
                nombre: 'A la derecha',
                value: 'D'
            },
            {
                nombre: 'A la Izquierda',
                value: 'I'
            }
        ];

        vm.referenceRoutineValidations = [
            {
                nombre: 'Módulo 06',
                value: 'MO06'
            },
            {
                nombre: 'Módulo 10',
                value: 'MO10'
            },
            {
                nombre: 'Módulo 11',
                value: 'MO11'
            },
            {
                nombre: 'Módulo 15',
                value: 'MO15'
            },
            {
                nombre: 'Modo Doble Dígito',
                value: 'DODI'
            }
        ];

        vm.fixedValueFormats = [
            {
                nombre: 'AlfaNúmerico',
                value: 'A'
            },
            {
                nombre: 'Númerico',
                value: 'N'
            },
            {
                nombre: 'Fecha (AAAAMMDD)',
                value: 'D1'
            },
            {
                nombre: 'Fecha (DDMMAAAA)',
                value: 'D2'
            }
        ];

        vm.dateFormats = [
            {
                nombre: 'AlfaNúmerico',
                value: 'A'
            },
            {
                nombre: 'Númerico',
                value: 'N'
            },
            {
                nombre: 'Fecha (AAAAMMDD)',
                value: 'D1'
            },
            {
                nombre: 'Fecha (DDMMAAAA)',
                value: 'D2'
            }
        ];

        vm.dateAlignments = [
            {
                nombre: 'A la derecha',
                value: 'D'
            },
            {
                nombre: 'A la Izquierda',
                value: 'I'
            }
        ];

        vm.dateFillCharacters = [
            {
                nombre: 'Ceros',
                value: '1'
            },
            {
                nombre: 'Espacios',
                value: '2'
            }
        ];

        vm.valueFormats = [
            {
                nombre: 'AlfaNúmerico',
                value: 'A'
            },
            {
                nombre: 'Númerico',
                value: 'N'
            },
            {
                nombre: 'Fecha (AAAAMMDD)',
                value: 'D1'
            },
            {
                nombre: 'Fecha (DDMMAAAA)',
                value: 'D2'
            }
        ];

        vm.valueAlignments = [
            {
                nombre: 'A la derecha',
                value: 'D'
            },
            {
                nombre: 'A la Izquierda',
                value: 'I'
            }
        ];

        vm.valueFillCharacters = [
            {
                nombre: 'Ceros',
                value: '1'
            },
            {
                nombre: 'Espacios',
                value: '2'
            }
        ];

        function changeType() {
            if (vm.type == '') {
                vm.stateReference = false;
                vm.stateAdditional = false;
                vm.stateFixedValue = false;
                vm.stateDate = false;
                vm.stateValue = false;
                vm.stateInformationMessage = false;
            } else if (vm.type == 'REF') {
                vm.stateReference = true;
                vm.stateAdditional = false;
                vm.stateFixedValue = false;
                vm.stateDate = false;
                vm.stateValue = false;
                vm.stateInformationMessage = false;
            } else if (vm.type == 'ADI') {
                vm.stateAdditional = true;
                vm.stateReference = false;
                vm.stateFixedValue = false;
                vm.stateDate = false;
                vm.stateValue = false;
                vm.stateInformationMessage = false;
            } else if (vm.type == 'VAF') {
                vm.stateFixedValue = true;
                vm.stateReference = false;
                vm.stateAdditional = false;
                vm.stateDate = false;
                vm.stateValue = false;
                vm.stateInformationMessage = false;
            } else if (vm.type == 'FEC') {
                vm.stateDate = true;
                vm.stateFixedValue = false;
                vm.stateReference = false;
                vm.stateAdditional = false;
                vm.stateValue = false;
                vm.stateInformationMessage = false;
            } else if (vm.type == 'VAL') {
                vm.stateValue = true;
                vm.stateDate = false;
                vm.stateFixedValue = false;
                vm.stateReference = false;
                vm.stateAdditional = false;
                vm.stateInformationMessage = false;
            } else if (vm.type == 'MSJ') {
                vm.stateInformationMessage = true;
                vm.stateValue = false;
                vm.stateDate = false;
                vm.stateFixedValue = false;
                vm.stateReference = false;
                vm.stateAdditional = false;
            }
        }

        function addReference() {

            if (vm.references.length <= 6) {
                var reference = {
                    id: (vm.references.length + 1),
                    referenceId: '01000',
                    description: '',
                    format: '',
                    fieldLength: '',
                    barLength: '',
                    obligatoryField: '',
                    inputPosition: 0,
                    outputPosition: '',
                    fillCharacter: '',
                    quickHelp: '',
                    alignment: '',
                    municipalityField: '',
                    taxOver: '',
                    routineValidation: ''
                };
                vm.references.push(reference);
            } else {
                toastr.error('Limite de referencias excedido', 'Error');
            }
        }

        function deleteReference(index) {
            if (vm.references.length > 1) {
                vm.references.splice(index, 1);
            } else {
                vm.references.splice(index, 1);
                vm.references.push({
                    id: 1,
                    description: '',
                    format: '',
                    fieldLength: '',
                    barLength: '',
                    obligatoryField: '',
                    inputPosition: 0,
                    outputPosition: '',
                    fillCharacter: '',
                    quickHelp: '',
                    alignment: '',
                    municipalityField: '',
                    taxOver: '',
                    routineValidation: ''
                });
            }
        }

        function addAdditional() {

            if (vm.additionals.length <= 6) {
                var additional = {
                    id: (vm.additionals.length + 1),
                    referenceId: '01000',
                    description: '',
                    format: '',
                    fieldLength: '',
                    obligatoryField: '',
                    inputPosition: 0,
                    outputPosition: '',
                    fillCharacter: '',
                    quickHelp: '',
                    alignment: '',
                    municipalityField: '',
                    taxOver: '',
                    routineValidation: ''
                };
                vm.additionals.push(additional);
            } else {
                toastr.error('Limite de referencias adicionales excedido', 'Error');
            }
        }

        function deleteAdditional(index) {
            if (vm.additionals.length > 1) {
                vm.additionals.splice(index, 1);
            } else {
                vm.additionals.splice(index, 1);
                vm.additionals.push({
                    id: 1,
                    description: '',
                    format: '',
                    fieldLength: '',
                    obligatoryField: '',
                    inputPosition: 0,
                    outputPosition: '',
                    fillCharacter: '',
                    quickHelp: '',
                    alignment: '',
                    municipalityField: '',
                    taxOver: '',
                    routineValidation: ''
                });
            }
        }

        function addFixedValue() {
            var fixedValue = {
                id: (vm.fixedValues.length + 1),
                referenceId: '05000',
                description: '',
                consecutive: '',
                format: '',
                fieldLength: '',
                amountIndicator: '',
                obligatoryField: '',
                minimumAmount: '',
                maximumAmount: ''
            };
            vm.fixedValues.push(fixedValue);
        }

        function deleteFixedValue(index) {
            if (vm.fixedValues.length > 1) {
                vm.fixedValues.splice(index, 1);
            } else {
                vm.fixedValues.splice(index, 1);
                vm.fixedValues.push({
                    id: 1,
                    description: '',
                    consecutive: '',
                    format: '',
                    fieldLength: '',
                    amountIndicator: '',
                    obligatoryField: '',
                    minimumAmount: '',
                    maximumAmount: ''
                });
            }
        }

        function addDate() {
            var date = {
                description: '',
                format: '',
                inputPosition: '',
                fieldLength: 8,
                alignment: '',
                fillCharacter: '',
                lengthBars: 8,
                quickHelp: ''
            };

            vm.dates.push(date);
        }

        function deleteDate(index) {
            if (vm.dates.length > 1) {
                vm.dates.splice(index, 1);
            } else {
                vm.dates.splice(index, 1);
                vm.dates.push({
                    description: '',
                    format: '',
                    inputPosition: '',
                    fieldLength: 8,
                    alignment: '',
                    fillCharacter: '',
                    lengthBars: 8,
                    quickHelp: ''
                });
            }
        }

        function addValue() {
            var value = {
                description: '',
                format: '',
                inputPosition: '',
                fieldLength: '',
                alignment: '',
                fillCharacter: '',
                lengthBars: '',
                quickHelp: ''
            };

            vm.values.push(value);
        }

        function deleteValue(index) {
            if (vm.values.length > 1) {
                vm.values.splice(index, 1);
            } else {
                vm.values.splice(index, 1);
                vm.values.push({
                    description: '',
                    format: '',
                    inputPosition: '',
                    fieldLength: '',
                    alignment: '',
                    fillCharacter: '',
                    lengthBars: '',
                    quickHelp: ''
                });
            }
        }

        function deleteInformationMessage() {
            vm.informationMessage = '';
        }

        function save() {
            if (vm.stateReference) {
                var requestReferences = [];
                var sw = true;
                var suma = 0;
                for (var i = 0; i < vm.references.length; i++) {
                    suma = suma + parseInt(vm.references[i].fieldLength);
                    var num = parseInt(vm.references[i].fieldLength);
                    if (num >= 25) {
                        sw = false;
                        toastr.error('Incorrecto la longitud del campo de la referencia #' + (i + 1) + " debe ser menor a 25 ! ", 'Error');
                    }
                }

                if (OutputFileService.getOutputFileType() == '09') {
                    var longitudReferencia = 64;
                } else {
                    var longitudReferencia = 48;
                }

                if (suma > longitudReferencia) {
                    sw = false;
                    toastr.error("Incorrecto la sumatoria de las longitudes de campos de referencias no puden ser mayor a : " + longitudReferencia);
                }

                if (sw) {
                    angular.forEach(vm.references, function (value, key) {
                        var nameFormat = '';
                        angular.forEach(vm.referenceFormats, function (data, key) {
                            if (value.format == data.value) {
                                nameFormat = data.nombre;
                            }
                        });

                        requestReferences.push({
                            "referenceId": value.referenceId,
                            "identifierReference": "01",
                            "name": value.description,
                            "referenceType": {
                                "id": "01",
                                "name": "RE"
                            },
                            "referenceDescription": value.description,
                            "longDescription": value.quickHelp,
                            "typeFormat": {
                                "id": value.format,
                                "name": nameFormat
                            },
                            "typeAlignment": {
                                "id": value.alignment,
                                "name": value.alignment == 'D' ? 'A la derecha' : 'A la izquierda'
                            },
                            "length": value.fieldLength,
                            "position": value.barLength,
                            "positionInitial": value.inputPosition,
                            "positionOut": value.outputPosition,
                            "paddingCharacters": 2,
                            "indicator": [{
                                "id": "",
                                "indicatorId": "",
                                "name": "",
                                "isActive": false,
                                "limits": [{
                                    "id": "",
                                    "name": "",
                                    "value": 0,
                                    "start": "",
                                    "end": ""
                                }],
                                "value": [{
                                    "id": "OBLIGATORY_FIELD",
                                    "name": ""
                                }]
                            }],
                            "parameter": [{
                                "id": "0000003",
                                "name": "indicadores",
                                "parameterType": {
                                    "id": "N",
                                    "name": ""
                                },
                                "length": value.obligatoryField,
                                "position": 0,
                                "constant": 0,
                                "numberParameter": "",
                                "ubicationParameter": {
                                    "id": "",
                                    "position": 0,
                                    "lenght": 0
                                }
                            }]
                        });
                    });


                    vm.myPromiseReference = ReferenceInformationService.createReferences(requestReferences)
                        .then(function (response) {
                            angular.forEach(response, function (value, key) {
                                if (value.state == 'fulfilled') {
                                    vm.references[key].referenceId = value.value.data.data.referenceId;
                                    toastr.info('Referencia: ' + vm.references[key].id + ' almacenada Exitosamente.', 'Informacion!');
                                } else if (value.state == 'rejected') {
                                    console.log('error', value.reason.data);
                                    toastr.error('Referencia: ' + vm.references[key].id + ' No Almacenada', 'Error !');
                                }
                            });
                        });
                }

            } else if (vm.stateAdditional) {

                var requestAdditionals = [];

                angular.forEach(vm.additionals, function (value, key) {
                    var nameFormat = '';
                    angular.forEach(vm.referenceFormats, function (data, key) {
                        if (value.format == data.value) {
                            nameFormat = data.nombre;
                        }
                    });

                    requestAdditionals.push({
                        "referenceId": value.referenceId,
                        "identifierReference": "02",
                        "name": value.description,
                        "referenceType": {
                            "id": "02",
                            "name": "02"
                        },
                        "referenceDescription": value.description,
                        "longDescription": value.quickHelp,
                        "typeFormat": {
                            "id": value.format,
                            "name": nameFormat
                        },
                        "typeAlignment": {
                            "id": value.alignment,
                            "name": value.alignment == 'D' ? 'A la derecha' : 'A la izquierda'
                        },
                        "length": value.fieldLength,
                        "position": value.inputPosition,
                        "positionInitial": value.inputPosition,
                        "positionOut": value.outputPosition,
                        "paddingCharacters": 2, // esta mal en front antiguo verificar valor  value.fillCharacter siempre envia 2 en front viejo
                        "indicator": [{
                            "id": "",
                            "indicatorId": "",
                            "name": "",
                            "isActive": false,
                            "limits": [{
                                "id": "",
                                "name": "",
                                "value": 0,
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                    "id": "OBLIGATORY_FIELD",
                                    "name": ""
                                },
                                {
                                    "id": "OBLIGATORY_FIELD",
                                    "name": ""
                                },
                                {
                                    "id": "OBLIGATORY_FIELD",
                                    "name": ""
                                }
                            ]
                        }],
                        "parameter": [{
                            "id": "0000003",
                            "name": "indicadores",
                            "parameterType": {
                                "id": "N",
                                "name": ""
                            },
                            "length": value.obligatoryField,
                            "position": 0,
                            "constant": 0,
                            "numberParameter": "",
                            "ubicationParameter": {
                                "id": "",
                                "position": 0,
                                "lenght": 0
                            }
                        }]
                    });
                });

                vm.myPromiseAdditional = ReferenceInformationService.createAdditionals(requestAdditionals)
                    .then(function (response) {
                        angular.forEach(response, function (value, key) {
                            if (value.state == 'fulfilled') {
                                vm.additionals[key].referenceId = value.value.data.data.referenceId;
                                toastr.info('Referencia: ' + vm.additionals[key].id + ' almacenada Exitosamente.', 'Informacion!');
                            } else if (value.state == 'rejected') {
                                toastr.error('Referencia: ' + vm.additionals[key].id + ' No Almacenada', 'Error !');
                            }
                        });
                    });

            } else if (vm.stateFixedValue) {

                var requestFixedValues = [];
                angular.forEach(vm.fixedValues, function (value, key) {
                    var nameFormat = '';
                    angular.forEach(vm.fixedValueFormats, function (data, key) {
                        if (value.format == data.value) {
                            nameFormat = data.nombre;
                        }
                    });
                    requestFixedValues.push({
                        "referenceId": value.referenceId,
                        "identifierReference": value.referenceId,
                        "name": value.description,
                        "referenceType": {
                            "id": "05",
                            "name": "05"
                        },
                        "referenceDescription": value.description,
                        "typeFormat": {
                            "id": value.format,
                            "name": nameFormat
                        },
                        "typeAlignment": {
                            "id": 'D',
                            "name": 'A la derecha'
                        },
                        "length": value.fieldLength,
                        "positionInitial": 1,
                        "paddingCharacters": 1,
                        "indicator": [{
                            "id": "0502",
                            "name": "OBLIGATORY_FIELD",
                            "isActive": value.obligatoryField ? true : false,
                            "limits": [{
                                "id": "050201",
                                "name": "TAX_SURCHARGE",
                                "value": "2",
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                "id": "",
                                "name": ""
                            }]
                        }],
                        "parameter": [
                            {
                                "id": "0000001",
                                "name": value.minimumAmount,
                                "parameterType": {
                                    "id": "",
                                    "name": ""
                                },
                                "length": 0,
                                "position": 0,
                                "constant": 0,
                                "numberParameter": "",
                                "ubicationParameter": {
                                    "id": "",
                                    "position": 0,
                                    "lenght": 0
                                }
                            },
                            {
                                "id": "0000002",
                                "name": value.maximumAmount,
                                "parameterType": {
                                    "id": "",
                                    "name": ""
                                },
                                "length": 0,
                                "position": 0,
                                "constant": 0,
                                "numberParameter": "",
                                "ubicationParameter": {
                                    "id": "",
                                    "position": 0,
                                    "lenght": 0
                                }
                            },
                            {
                                "id": "0000003",
                                "name": "indicadores",
                                "parameterType": {
                                    "id": value.amountIndicator == true ? "S" : "N",
                                    "name": ""
                                },
                                "length": value.obligatoryField,
                                "position": 0,
                                "constant": 0,
                                "numberParameter": "",
                                "ubicationParameter": {
                                    "id": "",
                                    "position": 0,
                                    "lenght": 0
                                }
                            }
                        ]
                    });
                });

                vm.myPromiseFixedValue = ReferenceInformationService.createFixedValues(requestFixedValues)
                    .then(function (response) {
                        angular.forEach(response, function (value, key) {
                            if (value.state == 'fulfilled') {
                                vm.fixedValues[key].referenceId = value.value.data.data.referenceId;
                                toastr.info('Referencia: ' + vm.fixedValues[key].id + ' almacenada Exitosamente.', 'Informacion!');
                            } else if (value.state == 'rejected') {
                                toastr.error('Referencia: ' + vm.fixedValues[key].id + ' No Almacenada', 'Error !');
                            }
                        });
                    });

            } else if (vm.stateDate) {
                var requestDate = {};

                angular.forEach(vm.dates, function (value, key) {
                    var nameFormat = '';
                    angular.forEach(vm.dates, function (data, key) {
                        if (value.format == data.value) {
                            nameFormat = data.nombre;
                        }
                    });

                    requestDate = {
                        "referenceId": value.referenceId,
                        "identifierReference": value.referenceId,
                        "name": value.description,
                        "referenceType": {
                            "id": "04",
                            "name": "04"
                        },
                        "referenceDescription": value.description,
                        "longDescription": value.quickHelp,
                        "typeFormat": {
                            "id": value.format,
                            "name": nameFormat
                        },
                        "typeAlignment": {
                            "id": value.alignment,
                            "name": value.alignment == 'D' ? 'A la derecha' : 'A la izquierda'
                        },
                        "length": value.fieldLength,
                        "position": value.lengthBars,
                        "positionInitial": value.inputPosition,
                        "paddingCharacters": value.fillCharacter === 'ZEROS' ? 1 : 2,
                        "indicator": [{
                            "id": "04",
                            "name": "",
                            "isActive": true,
                            "limits": [{
                                "id": "04",
                                "name": "",
                                "value": 1,
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                "id": "",
                                "name": ""
                            }]
                        }]
                    };
                });

                vm.myPromiseDate = ReferenceInformationService.createDate(requestDate)
                    .then(function (response) {
                        angular.forEach(response, function (value, key) {
                            vm.dates[0].referenceId = value.referenceId;
                            toastr.info('Referencia almacenada Exitosamente.', 'Informacion!');
                        });
                    }, function (error) {
                        toastr.error('Referencia No Almacenada', 'Error !');
                    });

            } else if (vm.stateValue) {
                var requestValue = {};

                angular.forEach(vm.values, function (value, key) {
                    var nameFormat = '';
                    angular.forEach(vm.values, function (data, key) {
                        if (value.format == data.value) {
                            nameFormat = data.nombre;
                        }
                    });

                    requestValue = {
                        "referenceId": value.referenceId,
                        "identifierReference": value.referenceId,
                        "name": value.description,
                        "referenceType": {
                            "id": "03",
                            "name": "03"
                        },
                        "referenceDescription": value.description,
                        "longDescription": value.quickHelp,
                        "typeFormat": {
                            "id": value.format,
                            "name": nameFormat
                        },
                        "typeAlignment": {
                            "id": value.alignment,
                            "name": value.alignment == 'D' ? 'A la derecha' : 'A la izquierda'
                        },
                        "length": value.fieldLength,
                        "position": value.lengthBars,
                        "padding": value.lengthBars,
                        "positionInitial": value.inputPosition,
                        "paddingCharacters": value.fillCharacter === 'ZEROS' ? 1 : 2,
                        "indicator": [{
                            "id": "04",
                            "name": "",
                            "isActive": true,
                            "limits": [{
                                "id": "04",
                                "name": "",
                                "value": 1,
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                "id": "",
                                "name": ""
                            }]
                        }]
                    };
                });

                vm.myPromiseValue = ReferenceInformationService.createValue(requestValue)
                    .then(function (response) {
                        angular.forEach(response, function (value, key) {
                            vm.values[0].referenceId = value.referenceId;
                            toastr.info('Referencia almacenada Exitosamente.', 'Informacion!');
                        });
                    }, function (error) {
                        toastr.error('Referencia No Almacenada', 'Error !');
                    });

            } else if (vm.stateInformationMessage) {

                var requestInformationMessage = [];
                var x = 0;
                var y = 30;
                var z = 90;

                var tamanoDescripcion = vm.informationMessage.length;
                var total = Math.ceil(tamanoDescripcion / 90);

                var difference = total - vm.messages.length;

                for (var i = 0; i < total; i++) {
                    if (i >= vm.messages.length) {
                        vm.messages.push({
                            referenceId: '06000',
                            referenceDescription: '',
                            longDescription: ''
                        });
                    }
                    vm.messages[i].referenceDescription = vm.informationMessage.substring(x, y);
                    vm.messages[i].longDescription = vm.informationMessage.substring(y, z);
                    x = z;
                    y = x + 30;
                    z = y + 60;
                }

                console.log('vm.messages', vm.messages);

                if (difference < 0) {
                    console.log('vm.messages', vm.messages);
                    console.log('total', total);
                    console.log('vm.messages.length', vm.messages.length);
                    console.log('(vm.messages.length - total)', (vm.messages.length - total));
                    var requestDeleteMessage = vm.messages.slice(total, vm.messages.length);
                    vm.messages.splice(total, (vm.messages.length - total));

                    console.log('vm.messages  delete', vm.messages);
                }

                angular.forEach(vm.messages, function (value, key) {

                    requestInformationMessage.push({
                        "referenceId": value.referenceId,
                        "identifierReference": "06",
                        "name": "06000",
                        "referenceType": {
                            "id": "06",
                            "name": "06"
                        },
                        "referenceDescription": value.referenceDescription,
                        "longDescription": value.longDescription,
                        "typeFormat": {
                            "id": 'A',
                            "name": 'Alfanumérico'
                        },
                        "typeAlignment": {
                            "id": 'D',
                            "name": 'A la derecha'
                        },
                        "length": 1,
                        "position": 0,
                        "padding": 1,
                        "positionInitial": 0,
                        "positionOut": 0,
                        "paddingCharacters": 2,
                        "indicator": [{
                            "id": "",
                            "name": "",
                            "isActive": false,
                            "limits": [{
                                "id": "",
                                "name": "",
                                "value": 0,
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                "id": "OBLIGATORY_FIELD",
                                "name": ""
                            }]
                        }]
                    });
                });

                vm.myPromiseMessage = ReferenceInformationService.createMessage(requestInformationMessage)
                    .then(function (response) {
                        angular.forEach(response, function (value, key) {
                            if (value.state == 'fulfilled') {
                                vm.messages[key].referenceId = value.value.data.data.referenceId;
                                console.log('exito');
                            } else if (value.state == 'rejected') {
                                console.log('error');
                            }
                        });
                        return ReferenceInformationService.deleteMessage(requestDeleteMessage);
                    }).then(function (response) {
                        angular.forEach(response, function (value, key) {
                            if (value.state == 'fulfilled') {
                                vm.messages[key].referenceId = value.value.data.data.referenceId;
                                console.log('exito eliminando');
                            } else if (value.state == 'rejected') {
                                console.log('error eliminando');
                            }
                        });
                    });

            }

        }
    }
})();
