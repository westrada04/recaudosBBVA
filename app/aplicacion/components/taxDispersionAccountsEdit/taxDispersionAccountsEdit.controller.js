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

        vm.success = false;
        vm.checkSave = checkSave;
        vm.save = save;
        vm.upload = upload;
        vm.deleteFile = deleteFile;

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

        function upload(file) {
            vm.success = true;
        }

        function deleteFile() {
            vm.file = null;
            vm.success = false;
        }

        function checkSave(taxDispersionAccount) {
            if (vm.success || taxDispersionAccount.$valid) {
                return false;
            } else {
                return true;
            }
        }

        function save() {
            var requestAgrement = GeneralDataEditService.getRequestAgreement();

            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            angular.forEach(vm.collectionAccounts, function (value, key) {
                while (value.identificationNumber.length < 15) {
                    if (value.identificationNumber.length < 15) {
                        value.identificationNumber = '0' + value.identificationNumber;
                    }
                }
            });

            var listado = [];
            for (var i = 0; i < vm.collectionAccounts.length; i++) {
                for (var j = 0; j < vm.collectionAccounts.length; j++) {
                    if (i != j) {
                        if (vm.collectionAccounts[i].accountNumber == vm.collectionAccounts[j].accountNumber) {
                            listado.push({
                                inicial: i,
                                final: j
                            });
                        }
                    }
                }
            }

            if (listado.length <= 0) {
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
            } else {
                toastr.error('Registros no Exitoso Elementos repetidos<br>');
                angular.forEach(listado, function (value, key) {
                    toastr.error('Cuenta repetida #' + value.inicial + ' con cuenta #' + value.final);
                });
            }

        }
    }
})();
