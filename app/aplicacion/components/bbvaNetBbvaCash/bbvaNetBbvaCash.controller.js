(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCash')
        .controller('BbvaNetBbvaCashController', BbvaNetBbvaCashController);

    function BbvaNetBbvaCashController(GeneralDataService, toastr, ReferenceInformationService, BbvaNetBbvaCashService, $scope) {
        var vm = this;

        vm.status = true;
        vm.references = [];
        vm.referencias = [];
        var reference = {
            referenceId: '99000',
            fieldType: '',
            referenceDescription: ''
        };
        vm.references.push(reference);

        $scope.$on('references', function (evt, msg) {
            vm.referencias = msg;

            if (vm.references.length <= vm.referencias.length) {
                angular.forEach(vm.references, function (value, key) {
                    vm.references[key].referenceDescription = vm.referencias[key].referenceDescription;
                });
            }

        });

        var localReference = [];
        vm.activate = activate;
        vm.deactivate = deactivate;
        vm.save = save;

        vm.addReference = addReference;
        vm.deleteReference = deleteReference;

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

        function addReference() {

            if ((vm.references.length + 1) <= vm.referencias.length) {
                var reference = {
                    referenceId: '99000',
                    fieldType: '',
                    referenceDescription: vm.referencias[vm.references.length].referenceDescription
                };
                vm.references.push(reference);
            } else {
                toastr.error('No puede Agregar refencia, excede el numero de referencias tipo references reportadas en el modulo Informacion de referencias', 'Error!');
            }
        }

        function deleteReference(index) {

            var referenceId = vm.references[index].referenceId;
            if (referenceId != '99000') {
                vm.myPromise = BbvaNetBbvaCashService.deleteReference(referenceId)
                    .then(function (response) {
                        if (vm.references.length > 1) {
                            vm.references.splice(index, 1);
                        } else {
                            vm.references.splice(index, 1);
                            vm.references.push({
                                referenceId: '99000',
                                fieldType: '',
                                referenceDescription: vm.references[0].referenceDescription
                            });
                        }
                        toastr.info('Referencia eliminada Exitosamente.', 'Informacion!');
                    }, function (error) {
                        toastr.error('Referencia No Eliminada <br> ' + error.data["error-message"], 'Error !');
                    });
            } else {
                if (vm.references.length > 1) {
                    vm.references.splice(index, 1);
                } else {
                    vm.references.splice(index, 1);
                    vm.references.push({
                        referenceId: '99000',
                        fieldType: '',
                        referenceDescription: vm.references[0].referenceDescription
                    });
                }
            }
        }

        function save() {
            var requestAgrement = GeneralDataService.getRequestAgreement();
            var requestReferences = ReferenceInformationService.getReferences();


            if (requestAgrement.idAgreement == undefined) {
                toastr.error('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            if (requestReferences.length == 0) {
                toastr.error('Debe guardar Información de referencias para realizar este registro!', 'Informacion !');
                return;
            }

            if (vm.references.length > requestReferences.length) {
                toastr.error('El numero de referencias no puede ser mayor a las referencias tipo references registradas en el modulo Informacion de Referencia!', 'Informacion !');
                return;
            }

            var referencesRequest = [];

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
                angular.forEach(vm.references, function (value, key) {
                    referencesRequest.push({
                        "referenceId": value.referenceId,
                        "identifierReference": value.referenceId,
                        "name": requestReferences[key].referenceDescription,
                        "referenceType": {
                            "id": "99",
                            "name": "99"
                        },
                        "referenceDescription": "",
                        "longDescription": requestReferences[key].longDescription,
                        "typeFormat": {
                            "id": requestReferences[key].typeFormat.id,
                            "name": ""
                        },
                        "typeAlignment": {
                            "id": requestReferences[key].typeAlignment.id,
                            "name": ''
                        },
                        "length": requestReferences[key].length,
                        "positionInitial": requestReferences[key].positionInitial,
                        "paddingCharacters": requestReferences[key].paddingCharacters,
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
                    });
                });

            } else {
                requestAgrement.agreementConfiguration.channel.push({
                    "id": "05",
                    "name": "MNET",
                    "category": vm.category,
                    "subCategory": vm.subcategory,
                    "alignment": !vm.status == true ? "A" : "D", // D => desactivar - A => Activar
                    "longDescription": "",
                    "descriptionChannel": vm.imageFormat,
                    "paddingCharacters": vm.domicileIndicator == true ? "S" : "N",
                    "dataType": vm.format,
                });
                angular.forEach(vm.references, function (value, key) {
                    referencesRequest.push({
                        "referenceId": value.referenceId,
                        "identifierReference": value.referenceId,
                        "name": requestReferences[key].referenceDescription,
                        "referenceType": {
                            "id": "99",
                            "name": "99"
                        },
                        "referenceDescription": "",
                        "longDescription": requestReferences[key].longDescription,
                        "typeFormat": {
                            "id": requestReferences[key].typeFormat.id,
                            "name": ""
                        },
                        "typeAlignment": {
                            "id": requestReferences[key].typeAlignment.id,
                            "name": value.fieldType
                        },
                        "length": requestReferences[key].length,
                        "positionInitial": requestReferences[key].positionInitial,
                        "paddingCharacters": requestReferences[key].paddingCharacters,
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
                                "name": value.fixedValue == true ? "S" : "N"
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
                    });
                });
            }


            var myPromise = BbvaNetBbvaCashService.createAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                    return BbvaNetBbvaCashService.createReferences(referencesRequest);
                }).then(function (response) {
                    localReference = [];
                    angular.forEach(response, function (value, key) {
                        if (value.state == 'fulfilled') {

                            console.log('valor => ',value.value.data.data);
                            console.log('valor',value.value.data.data.referenceId );

                            vm.references[key].referenceId = value.value.data.data.referenceId;
                            console.log('vm.references[key]', vm.references[key]);
                            toastr.info('Referencia almacenada Exitosamente.', 'Informacion!');
                        } else if (value.state == 'rejected') {
                            toastr.error('Referencia No Almacenada <br> ' + value.reason.data["error-message"], 'Error !');
                        }
                    });

                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }

})();
