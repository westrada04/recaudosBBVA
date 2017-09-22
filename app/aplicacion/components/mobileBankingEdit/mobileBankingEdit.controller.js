(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBankingEdit')
        .controller('MobileBankingEditController', MobileBankingEditController);

    function MobileBankingEditController(MobileBankingEditService, ReferenceInformationEditService, toastr, GeneralDataEditService, ConsultAgreementService, $scope) {
        var vm = this;

        //datos obtenidos
        var request = ConsultAgreementService.getChannel();
        var referen = ConsultAgreementService.getReferencesInf();
        var refMnet = referen.MNET;

        if (request.MNET.length > 0) {
            vm.category = request.MNET[0].category;
            vm.subcategory = request.MNET[0].subcategory;
            vm.format = request.MNET[0].format;
            vm.imageFormat = request.MNET[0].imageFormat;
            if (request.MNET[0].status != undefined) {
                vm.status = request.MNET[0].status;
            } else {
                vm.status = true;
            }
        } else {
            vm.status = true;
        }

        if (refMnet.length != 0) {
            MobileBankingEditService.setIdReference(refMnet[0].referenceId);
            vm.fieldType = refMnet[0].fieldType.id;
            console.log('refMnet', refMnet);
            vm.referenceDescription = refMnet[0].referenceDescription;
        }

        vm.activate = activate;
        vm.deactivate = deactivate;
        vm.save = save;

        $scope.$on('referencesEdit', function (evt, msg) {
            vm.references = msg;
            vm.referenceDescription = vm.references[0].referenceDescription;
        });

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

        function save() {
            var requestAgrement = GeneralDataEditService.getRequestAgreement();
            var requestReferences = ReferenceInformationEditService.getReferences();
            var valfijo = '';

            if (requestAgrement.idAgreement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            if (requestReferences.length == 0) {
                toastr.info('Debe guardar Información de referencias para realizar este registro!', 'Informacion !');
                return;
            }

            if (requestReferences.length > 1) {
                toastr.error('Existe mas de una referencia tipo reference', 'Error');
            } else {

                if (requestAgrement.agreementConfiguration.channel == undefined) {
                    requestAgrement.agreementConfiguration.channel = [];
                }

                //preguntar si esta desactivado todo 
                if (vm.status) {
                    requestAgrement.agreementConfiguration.channel.push({
                        "id": "05",
                        "name": "MNET",
                        "category": '',
                        "subCategory": '',
                        "alignment": "D", // D => desactivar - A => Activar
                        "longDescription": "",
                        "descriptionChannel": '',
                        "paddingCharacters": '',
                        "dataType": '',
                    });
                    var referenceId = '';
                    // si ya existe referencia

                    if (MobileBankingEditService.getIdReference() != undefined) {
                        referenceId = MobileBankingEditService.getIdReference();
                    } else {
                        referenceId = "99000";
                    }

                    var requestReference = [{
                        "referenceId": referenceId,
                        "identifierReference": referenceId,
                        "name": vm.referenceDescription,
                        "referenceType": {
                            "id": "99",
                            "name": "99"
                        },
                        "referenceDescription": "",
                        "longDescription": requestReferences[0].longDescription,
                        "typeFormat": {
                            "id": requestReferences[0].typeFormat.id,
                            "name": ""
                        },
                        "typeAlignment": {
                            "id": requestReferences[0].typeAlignment.id,
                            "name": ''
                        },
                        "length": requestReferences[0].length,
                        "positionInitial": requestReferences[0].positionInitial,
                        "paddingCharacters": requestReferences[0].paddingCharacters,
                        "indicator": [{
                            "id": "",
                            "indicatorId": "",
                            "name": "",
                            "isActive": false,
                            "limits": [{
                                "id": "",
                                "name": "",
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                "id": "",
                                "name": ""
                            }]
                        }],
                        "parameter": [{
                            "id": "",
                            "name": "MNET",
                            "parameterType": {
                                "id": "",
                                "name": ''
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
                        }]
                    }];

                } else {
                    valfijo = vm.fixedValue == true ? "S" : "N";
                    requestAgrement.agreementConfiguration.channel.push({
                        "id": "05",
                        "name": "MNET" + valfijo,
                        "category": vm.category,
                        "subCategory": vm.subcategory,
                        "alignment": !vm.status == true ? "A" : "D", // D => desactivar - A => Activar
                        "longDescription": "",
                        "descriptionChannel": vm.imageFormat,
                        "paddingCharacters": vm.domicileIndicator == true ? "S" : "N",
                        "dataType": vm.format,
                    });

                    var referenceId = '';
                    // si ya existe referencia
                    if (MobileBankingEditService.getIdReference() != undefined) {
                        referenceId = MobileBankingEditService.getIdReference();
                    } else {
                        referenceId = "99000";
                    }

                    var requestReference = [{
                        "referenceId": referenceId,
                        "identifierReference": referenceId,
                        "name": vm.referenceDescription,
                        "referenceType": {
                            "id": "99",
                            "name": "99"
                        },
                        "referenceDescription": "",
                        "longDescription": requestReferences[0].longDescription,
                        "typeFormat": {
                            "id": vm.fieldType,
                            "name": ""
                        },
                        "typeAlignment": {
                            "id": requestReferences[0].typeAlignment.id,
                            "name": vm.fieldType
                        },
                        "length": requestReferences[0].length,
                        "positionInitial": requestReferences[0].positionInitial,
                        "paddingCharacters": requestReferences[0].paddingCharacters,
                        "indicator": [{
                            "id": "",
                            "indicatorId": "",
                            "name": "",
                            "isActive": false,
                            "limits": [{
                                "id": "",
                                "name": "",
                                "start": "",
                                "end": ""
                            }],
                            "value": [{
                                "id": "",
                                "name": ""
                            }]
                        }],
                        "parameter": [{
                            "id": "",
                            "name": "MNET",
                            "parameterType": {
                                "id": "",
                                "name": vm.fixedValue == true ? "S" : "N"
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
                        }]
                    }];
                }

                var myPromise = MobileBankingEditService.createAgreement(requestAgrement)
                    .then(function (response) {
                        toastr.info('Registro Exitoso!', 'Informacion !');
                        return MobileBankingEditService.createReferences(requestReference);
                    }).then(function (response) {

                        angular.forEach(response, function (value, key) {
                            if (value.state == 'fulfilled') {
                                MobileBankingEditService.setIdReference(value.value.data.data[key].referenceId);
                                toastr.info('Referencia: ' + value.value.data.data[key].referenceId + ' almacenada Exitosamente.', 'Informacion!');
                            } else if (value.state == 'rejected') {
                                toastr.error('Referencia: ' + vm.references[key].id + ' No Almacenada <br>' + value.reason.data["error-message"], 'Error !');
                            }
                        });

                    }).catch(function (error) {
                        toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                    });
            }
        }
    }
})();
