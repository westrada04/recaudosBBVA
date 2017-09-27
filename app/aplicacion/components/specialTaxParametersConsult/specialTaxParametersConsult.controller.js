(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersConsult')
        .controller('SpecialTaxParametersConsultController', SpecialTaxParametersConsultController);

    function SpecialTaxParametersConsultController(SpecialTaxParametersService, ConsultAgreementService, toastr) {
        var vm = this;
        var requestSpecialTax = ConsultAgreementService.getSpecialTaxParameters();

        vm.additionalValue = requestSpecialTax.additionalValue;
        vm.autoadhesive = requestSpecialTax.autoadhesive;
        vm.formatAutoadhesive = requestSpecialTax.formatAutoadhesive;
        vm.reciprocity = requestSpecialTax.reciprocity;
        vm.dispersion = requestSpecialTax.dispersion;
        vm.departmentReciprocity = requestSpecialTax.departmentReciprocity;
        vm.municipalityReciprocity = requestSpecialTax.municipalityReciprocity;
        vm.reciprocityAssociatedAgreement = requestSpecialTax.reciprocityAssociatedAgreement;
        vm.departmentPercentage = requestSpecialTax.departmentPercentage;
        vm.municipalityPercentage = requestSpecialTax.municipalityPercentage;
        vm.PercentageAssociatedAgreement = requestSpecialTax.PercentageAssociatedAgreement;
        vm.departmentTypeDays = requestSpecialTax.departmentTypeDays;
        vm.municipalityTypeDay = requestSpecialTax.municipalityTypeDay;
        vm.associatedAgreementsTypeDays = requestSpecialTax.associatedAgreementsTypeDays;
        vm.waitingAccountsDepartment = requestSpecialTax.waitingAccountsDepartment;
        vm.municipalityWaitingAccounts = requestSpecialTax.municipalityWaitingAccounts;
        vm.contributionType = request.contributionType;


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

        
    }
})();
