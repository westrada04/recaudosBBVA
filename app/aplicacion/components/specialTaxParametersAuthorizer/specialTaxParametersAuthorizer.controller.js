(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersEdit')
        .controller('SpecialTaxParametersEditController', SpecialTaxParametersEditController);

    function SpecialTaxParametersEditController(SpecialTaxParametersEditService, ConsultAgreementService, GeneralDataEditService, toastr) {
        var vm = this;
        var request = ConsultAgreementService.getSpecialTaxParameters();
        vm.additionalValue = request.additionalValue;
        vm.autoadhesive = request.autoadhesive;
        vm.formatAutoadhesive = request.formatAutoadhesive;
        vm.reciprocity = request.reciprocity;
        vm.dispersion = request.dispersion;
        vm.departmentReciprocity = request.departmentReciprocity;
        vm.municipalityReciprocity = request.municipalityReciprocity;
        vm.reciprocityAssociatedAgreement = request.reciprocityAssociatedAgreement;
        vm.departmentPercentage = request.departmentPercentage;
        vm.municipalityPercentage = request.municipalityPercentage;
        vm.PercentageAssociatedAgreement = request.PercentageAssociatedAgreement;
        vm.departmentTypeDays = request.departmentTypeDays;
        vm.municipalityTypeDay = request.municipalityTypeDay;
        vm.associatedAgreementsTypeDays = request.associatedAgreementsTypeDays;
        vm.waitingAccountsDepartment = request.waitingAccountsDepartment;
        vm.municipalityWaitingAccounts = request.municipalityWaitingAccounts;

        vm.save = save;

        vm.additionalValues = [
            {
                nombre: 'Fijo',
                value: 'F'
            },
            {
                nombre: 'Variable',
                value: 'V'
            },
            {
                nombre: 'Sin Valor A.',
                value: 'S'
            }
        ];

        vm.autoadhesives = [
            {
                nombre: 'Físico',
                value: 'F'
            },
            {
                nombre: 'Automático',
                value: 'A'
            },
            {
                nombre: 'No Aplica',
                value: 'N'
            }
        ];

        vm.formatAutoadhesives = [
            {
                nombre: 'Carta',
                value: 'C'
            },
            {
                nombre: 'Media Carta',
                value: 'M'
            },
            {
                nombre: 'Oficio',
                value: 'O'
            },
            {
                nombre: 'No Aplica',
                value: 'A'
            }
        ];

        vm.contributionTypes = [
            {
                nombre: 'Cuenta Contable',
                value: '1'
            },
            {
                nombre: 'Cuenta Personal',
                value: '2'
            }
        ];

        vm.departmentTypesDays = [
            {
                nombre: 'Calendario',
                value: 'C'
            },
            {
                nombre: 'Hábil',
                value: 'H'
            },
            {
                nombre: 'Fijo',
                value: 'F'
            }
        ];

        vm.municipalityTypesDay = [
            {
                nombre: 'Calendario',
                value: 'C'
            },
            {
                nombre: 'Hábil',
                value: 'H'
            },
            {
                nombre: 'Fijo',
                value: 'F'
            }
        ];

        vm.associatedAgreementsTypesDays = [
            {
                nombre: 'Calendario',
                value: 'C'
            },
            {
                nombre: 'Hábil',
                value: 'H'
            },
            {
                nombre: 'Fijo',
                value: 'F'
            }
        ];

        function save() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement().idAgreement;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            // cuenta espera Departamento
            var requestRefundwaitDept = {
                "name": "REFUND_WAITING_ACCD",
                "isActive": vm.waitingAccountsDepartment,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };

            // cuenta espera Municipio
            var requestDeliveryPeriod = {
                "name": "REFUND_WAITING_ACCM",
                "isActive": vm.municipalityWaitingAccounts,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    id: "",
                    name: ""
                }]
            };

            // Valor Adicional
            var requestAdditionalValue = {
                "name": "ADDITIONAL_VALUE",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.additionalValue,
                    "name": vm.additionalValue
                }],
            };

            // Autoadhesivo
            var requestSelf_Adhesive = {
                "name": "SELF_ADHESIVE",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.autoadhesive,
                    "name": vm.autoadhesive
                }],
            };

            // Tamaño Formato Autoadhesivo
            var requestSizeSelf_Adhesive = {
                "name": "SIZE_SELF_ADHESIVE",
                "isActive": vm.formatAutoadhesive != undefined ? true : false,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.formatAutoadhesive != undefined ? vm.formatAutoadhesive : "",
                    "name": vm.formatAutoadhesive != undefined ? vm.formatAutoadhesive : ""
                }]
            };

            // Reciprocidad
            var requestReciprocity = {
                "name": "RECIPROCITY",
                "isActive": vm.reciprocity,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }]
            };

            // Dispersión
            var requestDispersion = {
                "name": "DISPERSION",
                "isActive": vm.dispersion,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": "",
                    "name": ""
                }],
            };

            // Tipo de Derrama
            var requestDerrama = {
                "name": 'DERRAMA',
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.contributionType,
                    "name": vm.contributionType
                }]
            };

            // Dias derrama Departamento
            var requestDaysDepto = {
                "name": 'NUMBER_DAYS_DEPARTME',
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.departmentReciprocity,
                    "name": vm.departmentReciprocity
                }]
            };

            // Dias derrama Municipio
            var requestDaysMunic = {
                "name": "NUMBER_DAYS_MUNICIPA",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.municipalityReciprocity,
                    "name": vm.municipalityReciprocity
                }]
            };

            // Dias derrama Conv. Asociado
            var requestDaysAgreem = {
                "name": "NUMBER_DAYS_AGREEMEN",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.reciprocityAssociatedAgreement,
                    "name": vm.reciprocityAssociatedAgreement
                }]
            };

            // Tipo Dias derrama Departamento   
            var requestTypeDaysDepto = {
                "name": "TYPE_DAYS_DEPARTMENT",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.departmentTypeDays,
                    "name": vm.departmentTypeDays
                }]
            };

            // Tipo Dias derrama Municipio
            var requestTypeDaysMunic = {
                "name": "TYPE_DAYS_MUNICIPALI",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.municipalityTypeDay,
                    "name": vm.municipalityTypeDay
                }]
            };

            // Tipo Dias derrama Conv. Asociado
            var requestTypeDaysAgreem = {
                "name": "TYPE_DAYS_AGREEMENT",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.associatedAgreementsTypeDays,
                    "name": vm.associatedAgreementsTypeDays
                }]
            };

            // Porcentaje derrama Depto
            var requestPercentDaysDepto = {
                "name": "PERCENT_DISPERSION_D",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.departmentPercentage,
                    "name": vm.departmentPercentage
                }]
            };

            // Porcentaje derrama Municipio
            var requestPercentDaysMunic = {
                "name": "PERCENT_DISPERSI_MUN",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.municipalityPercentage,
                    "name": vm.municipalityPercentage
                }]
            };

            // Porcentaje derrama Conv. Asociado
            var requestPercentDaysAgreem = {
                "name": "PERCENT_DISPERSION_A",
                "isActive": true,
                "limits": [{
                    "start": "",
                    "end": ""
                }],
                "value": [{
                    "id": vm.percentageAssociatedAgreement,
                    "name": vm.percentageAssociatedAgreement
                }]
            };

            // Validar este indicador
            var requestValidationDatab = {
                "name": "VALIDATION_OF_DATA_B",
                "isActive": vm.databaseType != "",
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: vm.databaseType,
                    name: vm.databaseType
                }],
            };


            vm.myPromise = SpecialTaxParametersEditService.createIndicatorGen(requestRefundwaitDept, requestRefundwaitDept.name)
                .then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestDeliveryPeriod, requestDeliveryPeriod.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestAdditionalValue, requestAdditionalValue.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestSelf_Adhesive, requestSelf_Adhesive.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestSizeSelf_Adhesive, requestSizeSelf_Adhesive.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestReciprocity, requestReciprocity.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestDispersion, requestDispersion.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestDerrama, requestDerrama.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestDaysDepto, requestDaysDepto.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestDaysMunic, requestDaysMunic.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestDaysAgreem, requestDaysAgreem.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestTypeDaysDepto, requestTypeDaysDepto.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestTypeDaysMunic, requestTypeDaysMunic.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestTypeDaysAgreem, requestTypeDaysAgreem.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestPercentDaysDepto, requestPercentDaysDepto.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestPercentDaysMunic, requestPercentDaysMunic.name);
                }).then(function (response) {
                    return SpecialTaxParametersEditService.createIndicatorGen(requestPercentDaysAgreem, requestPercentDaysAgreem.name);
                }).then(function (response) {
                    toastr.info('Registros Exitosos!', 'Informacion !');
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
