(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashEdit')
        .controller('BbvaNetBbvaCashEditController', BbvaNetBbvaCashEditController);

    function BbvaNetBbvaCashEditController(GeneralDataEditService, toastr, BbvaNetBbvaCashEditService, ReferenceInformationEditService, ConsultAgreementService) {
        var vm = this;

        vm.status = true;

        var localReference = [];
        var request = ConsultAgreementService.getChannel();
        var referen = ConsultAgreementService.getReferencesInf();
        localReference = referen.BNET;
        
        if (request.BNET.length > 0) {
            vm.category = request.BNET[0].category;
            vm.subcategory = request.BNET[0].subcategory;
            vm.format = request.BNET[0].format;
            vm.imageFormat = request.BNET[0].imageFormat;
            vm.fixedValue = request.BNET[0].fixedValue;
            vm.domicileIndicator = request.BNET[0].domicileIndicator;

            if (request.BNET[0].status != undefined) {
                vm.status = request.BNET[0].status;
            } else {
                vm.status = true;
            }
        } else {
            vm.status = true;
        }
        vm.references =referen.BNET;

        vm.activate = activate;
        vm.deactivate = deactivate;
        vm.save = save;

        /*vm.references = [];
        var reference = {
            fieldType: '',
            referenceDescription: ''
        };
        vm.references.push(reference);
        */
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
            var reference = {
                fieldType: '',
                referenceDescription: ''
            };
            vm.references.push(reference);
        }

        function deleteReference(index) {
            if (vm.references.length > 1) {
                vm.references.splice(index, 1);
            } else {
                vm.references.splice(index, 1);
                vm.references.push({
                    fieldType: '',
                    referenceDescription: ''
                });
            }
        }

        function save() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement();
            var requestReferences = ReferenceInformationEditService.getReferences();
            var sw = true;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            if (requestReferences == undefined) {
                toastr.info('Debe guardar Información de referencias para realizar este registro!', 'Informacion !');
                return;
            }

            if (vm.references.length > requestReferences.length) {
                toastr.info('El numero de referencias no puede ser mayor a las referencias tipo references registradas en el modulo Informacion de Referencia!', 'Informacion !');
                return;
            }

            angular.forEach(requestAgrement.agreementConfiguration.channel, function (value, key) {
                if (value.name=='BNET'){
                    sw = false;
                    value.category=vm.category;
                    value.subCategory=vm.subcategory;
                    value.alignment=!vm.status == true ? "A" : "D";
                    value.paddingCharacters=vm.domicileIndicator == true ? "S" : "N";
                    value.dataType=vm.format;
                }
            });
            if (sw){
                requestAgrement.agreementConfiguration.channel.push({
                    "id": "05",
                    "name": "BNET",
                    "category": vm.category,
                    "subCategory": vm.subcategory,
                    "alignment": !vm.status == true ? "A" : "D", // D => desactivar - A => Activar
                    "longDescription": "",
                    "descriptionChannel": vm.imageFormat,
                    "paddingCharacters": vm.domicileIndicator == true ? "S" : "N",
                    "dataType": vm.format,
                });
            }

            var referencesRequest = [];
            angular.forEach(vm.references, function (value, key) {
                if (key < localReference.length &&(localReference[key].referenceId != undefined)) {
                    var referenceId = localReference[key].referenceId;
                } else {
                    var referenceId = '99000';
                }
                referencesRequest.push({
                    "referenceId": referenceId,
                    "identifierReference": referenceId,
                    "name": value.referenceDescription,
                    "referenceType": {
                        "id": "99",
                        "name": "99"
                    },
                    "referenceDescription": "",
                    "longDescription": requestReferences[key].longDescription,
                    "typeFormat": {
                        "id": value.fieldType,
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
                        "id": ""
                    }],
                    "parameter": [{
                        "id": "",
                        "name": "BNET",
                        "parameterType": {
                            "id": "",
                            "name": value.fixedValue == true ? "S" : "N"
                        },
                        "length": 0,
                        "position": 0,
                        "constant": 0,
                        "numberParameter": "",
                        "ubicationParameter": {}
                    }]
                });
            });
            

            var myPromise = BbvaNetBbvaCashEditService.createAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                    return BbvaNetBbvaCashEditService.createReferences(referencesRequest);
                }).then(function (response) {
                    localReference = [];
                    angular.forEach(response, function (value, key) {
                        if (value.state == 'fulfilled') {
                            if (referencesRequest[key].referenceId=='99000'){
                                localReference.push(value.value.data.data[0]);
                            }else{
                                localReference.push(value.value.data.data);   
                            }
                            
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
