(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.captureTypeEdit')
        .controller('CaptureTypeEditController', CaptureTypeEditController);

    function CaptureTypeEditController($scope, ConsultAgreementService, CaptureTypeEditService, GeneralDataEditService, toastr) {
        var vm = this;
        vm.listStatusAssociatedAgreements = [];

        //obtener datos
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        var request = ConsultAgreementService.getCaptureType();
        vm.type = request.type;
        vm.statusCodeEan = false;
        vm.associatedAgreements = request.associatedAgreements;
        vm.listStatusAssociatedAgreements = request.listStatusAssociatedAgreements;
        vm.statusAssociatedAgreements = request.statusAssociatedAgreements;

        if (vm.listStatusAssociatedAgreements == 0) {
            var convenio = {
                associatedAgreementCode: '',
                numberAssociatedAgreement: '',
                associatedAccount: ''
            };
            vm.listStatusAssociatedAgreements.push(convenio);
        }


        if (request.EANCode != undefined) {
            vm.eanCode = request.EANCode;
            vm.statusCodeEan = true;
        }

        vm.changeType = changeType;
        vm.statusCollectionCard = false;
        vm.save = save;
        vm.addAgreement = addAgreement;
        vm.deleteAgreement = deleteAgreement;
        vm.validar = validar;


        if (vm.typeRequest == 'R') {
            vm.types = [
                {
                    nombre: "Manual",
                    value: "M"
                },
                {
                    nombre: "Código de Barras",
                    value: "B"
                },
                {
                    nombre: "Manual y Código de Barras",
                    value: "A"
                },
                {
                    nombre: "Tarjeta de Recaudo",
                    value: "T"
                }
            ];
        } else if (vm.typeRequest == 'I') {
            vm.types = [
                {
                    nombre: "Manual",
                    value: "M"
                },
                {
                    nombre: "Código de Barras",
                    value: "B"
                },
                {
                    nombre: "Manual y Código de Barras",
                    value: "A"
                }
            ];
        }
        $scope.$watch('vm.associatedAgreements', function (value) {
            if (vm.associatedAgreements == true) {
                vm.statusAssociatedAgreements = true;
            } else {
                vm.statusAssociatedAgreements = false;
            }
        });
        function validar() { // 1
            var tecla = (document.all) ? event.keyCode : event.which; // 2
            if (tecla==8) return true; // 3
            var patron =/\d/; // 4
            var te = String.fromCharCode(tecla); // 5
            event.returnValue = patron.test(te); // 6
        }

        function changeType() {
            if (vm.type == '' || vm.type == 'M') {
                vm.statusCodeEan = false;
                vm.statusCollectionCard = false;
            } else if (vm.type == 'B' || vm.type == 'A') {
                vm.statusCollectionCard = false;
                vm.statusCodeEan = true;
            } else if (vm.type == 'T') {
                vm.statusCodeEan = true;
                vm.statusCollectionCard = true;
            }
        }

        function addAgreement() {
            var convenio = {
                associatedAgreementCode: '',
                NumberAssociatedAgreement: '',
                associatedAccount: ''
            };
            vm.listStatusAssociatedAgreements.push(convenio);
        }

        function deleteAgreement(index) {
            if (vm.listStatusAssociatedAgreements.length > 1) {
                vm.listStatusAssociatedAgreements.splice(index, 1);
            } else {
                vm.listStatusAssociatedAgreements.splice(index, 1);
                vm.listStatusAssociatedAgreements.push({
                    associatedAgreementCode: '',
                    numberAssociatedAgreement: '',
                    associatedAccount: ''
                });
            }
        }

        function save() {
            
            var requestAgrement = GeneralDataEditService.getRequestAgreement();

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            var eancode = '0010000000000';
            var cardsValue = [{}];

            if (vm.statusCodeEan) {
                eancode = vm.eanCode;
            }

            if (vm.statusCollectionCard) {
                var cardsNameExpedition = "00-0000";
                var cardsNameRexpedition = "00-0000";

                if (vm.expedition != undefined) {
                    var auxNameExpedition = '';
                    if (vm.expedition.length < 4) {
                        for (var i = vm.expedition.length; i < 4; i++) {
                            auxNameExpedition = auxNameExpedition + '0';
                        }
                        cardsNameExpedition = '00-' + auxNameExpedition + '' + vm.expedition;
                    }
                }

                if (vm.rexpedition != undefined) {
                    var auxNameRexpedition = '';
                    if (vm.rexpedition.length < 4) {
                        for (var i = vm.rexpedition.length; i < 4; i++) {
                            auxNameRexpedition = auxNameRexpedition + '0';
                        }
                        cardsNameRexpedition = '00-' + auxNameRexpedition + '' + vm.rexpedition;
                    }
                }

                cardsValue.push({
                    "id": "00",
                    "name": cardsNameExpedition,
                    "value": 0,
                    "approvalDate": ""
                });

                cardsValue.push({
                    "id": "00",
                    "name": cardsNameRexpedition,
                    "value": 0,
                    "approvalDate": ""
                });
            }

            requestAgrement.EANCode = eancode;
            requestAgrement.cards = cardsValue;

            //asociacion de convenio
            var dataIndicators = [];
            angular.forEach(vm.listStatusAssociatedAgreements, function (value, key) {
                var data = value.associatedAgreementCode + '-' + value.numberAssociatedAgreement + '-' + value.associatedAccount;
                dataIndicators.push({
                    "name": "ASSOCIATE_AGREEMENT",
                    "isActive": vm.associatedAgreements,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": vm.associatedAgreements ? data : ''
                    }]
                });
            });

            // Tipo de captura
            var requestCaptureType = {
                "name": "CAPTURE_TYPE",
                "isActive": true,
                "value": [{
                    "id": vm.type=="T"?"B":vm.type,
                    "name": vm.type=="T"?"B":vm.type
                }],
                "limits": [{
                    "start": "",
                    "end": ""
                }],
            };

            var myPromise = CaptureTypeEditService.createAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                    return GeneralDataEditService.createIndicatorListGneral(dataIndicators, 'ASSOCIATE_AGREEMENT');
                }).then(function (response) {
                    return GeneralDataEditService.createIndicatorGeneral(requestCaptureType, requestCaptureType.name);
                }).then(function () {
                    toastr.info('Registros Exitosos!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
