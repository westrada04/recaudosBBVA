(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivableAuthorizer')
        .controller('AccountsReceivableAuthorizerController', AccountsReceivableAuthorizerController);

    function AccountsReceivableAuthorizerController(ConsultAgreementService, GeneralDataEditService, AccountsReceivableEditService, toastr) {
        var vm = this;
        vm.collectionAccounts = [];

        // obtener datos!
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        var request = ConsultAgreementService.getAccountsRC();
        vm.collectionAccounts = request.CtaADI;

        if (vm.collectionAccounts.length == 0) {
            var account = {
                type: '',
                accountNumber: '',
                percentageAgrement: '',
                idType: ''
            };
            vm.collectionAccounts.push(account);
        }

        vm.save = save;
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

        function save() {
            var requestAgrement = GeneralDataEditService.getRequestAgreement().idAgreement;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            angular.forEach(vm.collectionAccounts, function (value, key) {
                requestAgrement.relatedContract.push({
                    "relatedContractId": (3 + key),
                    "contractId": (3 + key),
                    "number": value.accountNumber,
                    "product": {
                        "id": value.accountNumber.substring(8, 10),
                        "name": value.accountNumber.substring(8, 10),
                    },
                    "relationType": {
                        "id": "ADI",
                        "name": "ADICIONAL",
                    },
                    "percentage": value.percentageAgrement,
                    "bankId": "0000"
                });
            });

            var myPromise = AccountsReceivableEditService.createAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
