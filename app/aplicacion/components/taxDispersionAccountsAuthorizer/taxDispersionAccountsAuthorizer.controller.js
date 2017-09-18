(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccountsEdit')
        .controller('TaxDispersionAccountsEditController', TaxDispersionAccountsEditController);

    function TaxDispersionAccountsEditController(TaxDispersionAccountsEditService, GeneralDataEditService, toastr, ConsultAgreementService) {
        var vm = this;
        vm.collectionAccounts = [];

        //datos obtendios
        var request = ConsultAgreementService.getAccountsRC();
        vm.collectionAccounts = request.CtaDIS;

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

        vm.idTypes = [
            {
                nombre: "Cédula",
                value: "01"
            },
            {
                nombre: "Cédula de Extranjería",
                value: "02"
            },
            {
                nombre: "NIT",
                value: "03"
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

        function save() {
            var requestAgrement = GeneralDataEditService.getRequestAgreement().idAgreement;

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            angular.forEach(vm.collectionAccounts, function (value, key) {
                while (value.identificationNumber < 15) {
                    if (value.identificationNumber < 15) {
                        value.identificationNumber = '0' + value.identificationNumber;
                    }
                }
            });

            angular.forEach(vm.collectionAccounts, function (value, key) {
                requestAgrement.relatedContract.push({
                    "relatedContractId": value.code,
                    "contractId": key + 2,
                    "relationType": {
                        "id": "CTD",
                        "name": value.idType + value.identificationNumber + value.identificationDigit,
                    },
                    "product": {
                        "id": value.accountType,
                        "name": value.nameContact + "-" + value.telephoneContact,
                    },
                    "percentage": value.type,
                    "number": value.account,
                    "bankId": value.bankCode
                });
            });

            //Si archivo viene informado
            if (document.getElementById('file').files[0] != undefined) {
                var f = document.getElementById('file').files[0],
                    r = new FileReader(f, "utf16le");
                r.onloadend = function (e) {

                    var data = e.target.result;

                    var lines = data.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        var datos = lines[i].split('\t');
                        if (datos[0] != undefined && datos[0] != "") {
                            requestAgrement.relatedContract.push({
                                "percentage": datos[0],
                                "relatedContractId": datos[1],
                                "contractId": i,
                                "relationType": {
                                    "id": "CTD",
                                    "name": datos[2] + "" + datos[3] + "" + datos[4]
                                },
                                "bankId": datos[5],
                                "number": datos[7],
                                "product": {
                                    "id": datos[6],
                                    "name": datos[8] + "-" + datos[9]
                                },
                            });
                        }
                    }
                };
                r.readAsText(f);
            }

            var myPromise = TaxDispersionAccountsEditService.createAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Exitoso!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
