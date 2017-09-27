(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccountsConsult')
        .controller('TaxDispersionAccountsConsultController', TaxDispersionAccountsConsultController);

    function TaxDispersionAccountsConsultController(ConsultAgreementService) {
        var vm = this;
        var requestAccountsRC = ConsultAgreementService.getAccountsRC();

        var account = {
            type: '',
            accountNumber: '',
            percentageAgrement: '',
            idType: ''
        };
        vm.collectionAccounts= requestAccountsRC.CtaDIS; 

        vm.addAccount = addAccount;
        vm.deleteAccount = deleteAccount;

        vm.idTypes = [
            {
                nombre: "Cédula",
                value: "1"
            },
            {
                nombre: "Cédula de Extranjería",
                value: "2"
            },
            {
                nombre: "NIT",
                value: "3"
            }
        ];

        vm.types = [
            {
                nombre: "Departamento",
                value: "D"
            },
            {
                nombre: "Municipio",
                value: "M"
            },
            {
                nombre: "Convenio Asociado",
                value: "C"
            },
            {
                nombre: "Devolución Dispersión",
                value: "R"
            }
        ];

        vm.typeAccounts = [
            {
                nombre: "Corriente",
                value: "01"
            },
            {
                nombre: "Ahorros",
                value: "02"
            }
        ];

        function addAccount() {
            var account = {
                type: '',
                accountNumber: '',
                percentageAgrement: '',
                idType: ''
            };
            vm.collectionAccounts.push(account);
        }

        function deleteAccount(index) {
            if (vm.collectionAccounts.length > 1) {
                vm.collectionAccounts.splice(index, 1);
            } else {
                vm.collectionAccounts.splice(index, 1);
                vm.collectionAccounts.push({
                    fixedField: '',
                    description: '',
                    minAmount: '',
                    maxAmount: ''
                });
            }
        }
    }
})();
