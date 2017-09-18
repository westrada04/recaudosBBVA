(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivableConsult')
        .controller('AccountsReceivableConsultController', AccountsReceivableConsultController);

    function AccountsReceivableConsultController(CreateAgreementService, ConsultAgreementService) {
        var vm = this;

        var requestAccountsRC = ConsultAgreementService.getAccountsRC();

        vm.typeRequest = requestAccountsRC.typeAgreement;

        vm.collectionAccounts = [];
        var account = {
            type: '',
            accountNumber: '',
            percentageAgrement: '',
            idType: ''
        };
        //vm.collectionAccounts.push(account);
        vm.collectionAccounts = requestAccountsRC.CtaADI;

        vm.addAccount = addAccount;
        vm.deleteAccount = deleteAccount;

        if (vm.typeRequest == 'R') {
            vm.types = [
                {
                    nombre: "Cuenta Corriente",
                    value: "CC"
                },
                {
                    nombre: "Cuenta de Ahorros",
                    value: "AH"
                },
                {
                    nombre: "Crédito Líquido",
                    value: "CL"
                }
            ];
        } else if (vm.typeRequest == 'I') {
            vm.types = [
                {
                    nombre: "Cuenta Corriente",
                    value: "CC"
                },
                {
                    nombre: "Cuenta de Ahorros",
                    value: "AH"
                }
            ];
        }



        vm.idTypes = [
            {
                nombre: "NIT",
                value: "3"
            },
            {
                nombre: "Cédula",
                value: "1"
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
