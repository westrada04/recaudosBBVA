(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultAgreement')
        .factory('ConsultAgreementService', ConsultAgreementService);

    function ConsultAgreementService($q, $http, API_BACKEND, UserService, $sessionStorage) {

        var idAgreement;

        var request = {
            agreements: '',
            indicators: '',
            references: ''
        };

        var service = {
            getUser: getUser,
            setRequest: setRequest,
            getRequest: getRequest,
            setIdAgreement: setIdAgreement,
            getIdAgreement: getIdAgreement,
            gettypeRequest: gettypeRequest,
            getAgreement: getAgreement,
            getIndicator: getIndicator,
            getReference: getReference,
            getGeneralData: getGeneralData,
            getDataBase: getDataBase,
            getOutputFile: getOutputFile,
            getSpecialTaxParameters: getSpecialTaxParameters,
            getFinancialTerminal: getFinancialTerminal,
            getReferencesInf: getReferencesInf,
            getCaptureType: getCaptureType,
            getAccountsRC: getAccountsRC,
            getPaytime: getPaytime,
            getChannel: getChannel,
            getPse: getPse,
            getPin: getPin
        };

        return service;

        //////////////////////////////////////

        function getUser() {
            return $sessionStorage.user;
        }

        function getAgreement() {

            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01/" + this.idAgreement, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIndicator() {

            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01/" + this.idAgreement + '/indicators', UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getReference() {

            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01/" + this.idAgreement + '/references', UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function setIdAgreement(idAgreement) {
            this.idAgreement = idAgreement;

        }

        function getIdAgreement() {
            return this.idAgreement;
        }

        function setRequest(request) {
            this.request = request;
        }

        function getRequest() {
            return this.request;
        }

        function gettypeRequest() {
            var typeRequest = "R";
            if (this.request.agreements.data.agreementType.id == 5) {
                typeRequest = "I";
            } else {
                typeRequest = "R";
            }
            return typeRequest;
        }

        function getGeneralData() {
            var agrement = this.request.agreements;
            var requestGeneralData = {};

            requestGeneralData.agreementName = agrement.data.name;
            requestGeneralData.IdAgreement = agrement.data.agreementClass.name;
            requestGeneralData.agreementNumber = agrement.data.agreementClass.name.substring(3, agrement.data.agreementClass.name.length - 3);
            requestGeneralData.classAgreement = "00" + agrement.data.agreementClass.id;
            requestGeneralData.typeAgreement = "00" + agrement.data.agreementType.id; // comentario puede estar mal 
            requestGeneralData.description = agrement.data.agreementDescription;
            requestGeneralData.stateContract = agrement.data.status.id === 'N' ? "A" : "I";
            requestGeneralData.expirationDate = agrement.data.expiration.expirationDate.split("T")[0]; // revisar formato de fecha!
            requestGeneralData.startTime = agrement.data.expiration.limits.start;
            requestGeneralData.finalHour = agrement.data.expiration.limits.end;
            requestGeneralData.EANCode = parseInt(agrement.data.EANCode);
            requestGeneralData.alternateCompany = agrement.data.RBMCode.substring(4, 5);
            requestGeneralData.codeAlternateCompany = agrement.data.RBMCode.substring(5, 12);
            requestGeneralData.classAlternateCompany = agrement.data.RBMCode.substring(12, 15);

            angular.forEach(agrement.data.notifications, function (value, key) {
                switch (value.notificationsType.id) {
                    case '03':
                        requestGeneralData.managerEmail = value.receiver.value

                        break;
                }
            });

            requestGeneralData.identificationType = ('0' + agrement.data.relatedParticipants[0].participantTypeId);

            switch (requestGeneralData.identificationType) {
                case '01':
                    requestGeneralData.identificationNumber = agrement.data.relatedParticipants[0].participantId.substring(1, 15);
                    requestGeneralData.stateVer = false;
                    break;
                case '02':
                    requestGeneralData.identificationNumber = agrement.data.relatedParticipants[0].participantId.substring(1, 15);
                    requestGeneralData.stateVer = false;
                    break;
                case '03':
                    requestGeneralData.stateVer = true;
                    requestGeneralData.identificationNumber = agrement.data.relatedParticipants[0].participantId.substring(1, agrement.data.relatedParticipants[0].participantId.length - 1);
                    requestGeneralData.ver = agrement.data.relatedParticipants[0].participantId.substring(agrement.data.relatedParticipants[0].participantId.length - 1, agrement.data.relatedParticipants[0].participantId.length);
                    break;
            }

            angular.forEach(agrement.data.relatedContract, function (value, key) {
                switch (value.relationType.id) {
                    case 'CON':
                        requestGeneralData.accountType = value.product.id == '01' ? "CC" : value.product.id == '02' ? "AH" : value.product.id == '96' ? "CL" : "";
                        requestGeneralData.accountNumber = value.number;
                        break;
                    case 'CTA':
                        requestGeneralData.waitingAccountNumber = value.number.trim();
                        break;
                    case '044':
                        requestGeneralData.tax0044 = value.number;
                        requestGeneralData.typeTax = value.product.name;
                        requestGeneralData.taxOffice = value.bankId;
                        break;
                }
            });

            requestGeneralData.paymentMethodsSelected = [];
            angular.forEach(this.request.indicators.data, function (value, key) {
                switch (value.id) {
                    case 'PAYMENT_METHOD':
                        angular.forEach(value.value, function (data, key) {
                            if (data.id == 'CASH_PAYMENT' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Efectivo',
                                    value: 'CASH_PAYMENT'
                                });
                            } else if (data.id == 'OWN_CHECK_PAYMENT' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Cheque BBVA',
                                    value: 'OWN_CHECK_PAYMENT'
                                });
                            } else if (data.id == 'EXCHANGE_CHECK' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Cheque Canje',
                                    value: 'EXCHANGE_CHECK'
                                });
                            } else if (data.id == 'LOAD_COUNT_PAYMENT' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Cargo a cuenta',
                                    value: 'LOAD_COUNT_PAYMENT'
                                });
                            } else if (data.id == 'CONSIGNMENT_PAYMENT' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Remesa',
                                    value: 'CONSIGNMENT_PAYMENT'
                                });
                            } else if (data.id == 'WAITING_ACCOUNT_EXCHANGE' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Crédito líquido',
                                    value: 'WAITING_ACCOUNT_EXCHANGE'
                                });
                            } else if (data.id == 'CREDIT_CARD_PAYMENT' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Tarjeta de crédito',
                                    value: 'CREDIT_CARD_PAYMENT'
                                });
                            } else if (data.id == 'CREDIT_VIRTUAL_PAYMENT' && data.name == 'S') {
                                requestGeneralData.paymentMethodsSelected.push({
                                    nombre: 'Crédito Virtual',
                                    value: 'CREDIT_VIRTUAL_PAYMENT'
                                });
                            }
                        });
                        break;
                    case 'EXTRACT_PAYMENT':
                        requestGeneralData.subscriptionFormat = value.isActive ? "AD" : "DC";
                        if (requestGeneralData.subscriptionFormat == 'AD') {
                            requestGeneralData.statusSubscriptionFormat = true;
                        } else if (requestGeneralData.subscriptionFormat == 'DC') {
                            requestGeneralData.statusSubscriptionFormat = false;
                        }
                        break;
                    case 'BULK_ACTIVE':
                        requestGeneralData.massiveActive = value.isActive;
                        break;
                    case 'IN_HOUSE':
                        requestGeneralData.inhouse = value.isActive;
                        break;
                    case 'MULTILOTE':
                        requestGeneralData.multilote = value.isActive;
                        break;
                    case 'CONSECUTIVE':
                        requestGeneralData.consecutive = value.isActive;
                        break;
                    case 'TRAFFIC_DOCUMENTS':
                        requestGeneralData.documentTraffic = value.isActive;
                        break;
                    case 'BANK':
                        if (value.isActive) {
                            requestGeneralData.banking = value.value[0].name;
                        }
                        break;
                    case 'WS_UNIFICATION':
                        if (value.isActive) {
                            requestGeneralData.ucw = true;
                            requestGeneralData.ucwCode = value.value[0].name;
                            requestGeneralData.statusUcw = true;
                        } else {
                            requestGeneralData.ucw = false;
                            requestGeneralData.statusUcw = false;
                        }
                        break;
                }
            });


            return requestGeneralData;
        }

        function getDataBase() {
            var listindicators = this.request.indicators;
            var requestDataBase = {};
            requestDataBase.typeAgreement = "00" + this.request.agreements.data.agreementType.id;

            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'FIRST_EXPIRATION_DATE':
                        requestDataBase.date1 = value.isActive;
                        break;
                    case 'SECOND_EXPIRATION_DATE':
                        requestDataBase.date2 = value.isActive;
                        break;
                    case 'RECEIVES_MORE_ONE_PAYMENT':
                        requestDataBase.morePayment = value.isActive ? value.value[0].name == 'N' ? false : true : false
                        break;
                    case 'TYPE_VALIDATION_DATABASE':
                        if (value.isActive) {
                            requestDataBase.databaseType = value.value[0].name;

                        } else {
                            requestDataBase.databaseType = "N";
                        }

                        break;
                    case 'VALUE_1':
                        requestDataBase.valor1 = value.isActive;
                        break;
                    case 'VALUE_2':
                        requestDataBase.valor2 = value.isActive;
                        break;
                    case 'NUMBER_OF_CYCLES':
                        if (value.isActive) {
                            requestDataBase.numberCycles = parseInt(value.value[0].name);
                        } else {
                            requestDataBase.numberCycles = "";
                        }

                        break;
                    case 'DAYS_DELETE_EXPIRATION_DATE':
                        requestDataBase.dueDate = value.isActive ? value.value[0].name : "";
                        break;
                    case 'KEY_LOAD':
                        requestDataBase.loadKey = value.isActive ? value.value[0].name : "1";
                        break;
                    case 'CHARGE_DATABASE':
                        if (value.isActive) {
                            requestDataBase.updateCycle = value.value[0].name;
                        } else {
                            requestDataBase.updateCycle = "";
                        }
                        break;
                    case 'VALIDATE_HEADER_DATE':
                        requestDataBase.dateEncab = value.isActive;

                        break;
                    case 'VALIDATE_DETAIL_DATE':
                        requestDataBase.dateDet1 = value.isActive;
                        break;
                }
            });

            return requestDataBase;
        }

        function getOutputFile() {
            var listindicators = this.request.indicators;
            var agrement = this.request.agreements;
            var requestOutputFile = {};
            requestOutputFile.notifications = [];

            angular.forEach(agrement.data.notifications, function (value, key) {
                switch (value.notificationsType.id) {
                    case '01':
                        requestOutputFile.notifications.push({

                            "emailNotification": value.receiver.value,
                            "email": value.receiver.value,
                        });
                        break;
                }
            });

            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'UPDATE_CYCLOS':
                        requestOutputFile.partialTransfer = value.isActive ? value.value[0].name : "";
                        break;
                    case 'STRUCTURE':
                        requestOutputFile.outputFileType = value.isActive ? value.value[0].name : "";
                        break;
                    case 'OUTPUT_FORMAT':
                        requestOutputFile.formatType = value.isActive ? (value.value[0].name) : "";
                        break;
                    case 'REPORT_FREQUENCY':
                        if (value.isActive) {
                            requestOutputFile.periodicityReport = value.value[0].name;

                        } else {
                            requestOutputFile.periodicityReport = "";
                        }

                        break;
                    case 'DELIVERY_FREQUENCY':
                        requestOutputFile.periodicityFile = value.isActive ? value.value[0].name : "";
                        break;
                    case 'GENERATION_FILE':
                        requestOutputFile.fileGeneration = value.isActive;
                        break;
                    case 'SPECIAL_AGREEMENT':
                        if (value.isActive) {
                            requestOutputFile.specialAgreement = value.value[0].name == "S" ? true : false;
                        } else {
                            requestOutputFile.specialAgreement = false;
                        }

                        break;
                    case 'CHANNEL_REPORT':
                        requestOutputFile.channelReport = value.isActive ? value.value[0].name : "";
                        break;
                    case 'MINIMUM_PERIODICITY':
                        requestOutputFile.minPeriodicity = value.isActive ? value.value[0].name : "";
                        break;
                    case 'SEND_AUTOMATIC_ARCHIVE':
                        requestOutputFile.autoSendFile = value.isActive;

                        break;
                    case 'DESTINATION_OUTPUT_F':
                        requestOutputFile.destination = value.isActive ? value.value[0].name == "C" ? "C" : "FTP" : "";
                        break;
                    case 'OUTPUT_BD_INPUT_POSI':
                        requestOutputFile.inputPositionBd = value.isActive ? value.value[0].name == "S" ? true : false : false;
                        break;
                    case 'LENGTH':
                        if (value.isActive) {
                            requestOutputFile.longitudeEnd = value.value[0].name.split("/")[1];
                            requestOutputFile.longitudeInit = value.value[0].name.split("/")[0];
                        }

                        break;

                }
            });
            return requestOutputFile;
        }

        function getSpecialTaxParameters() {
            var listindicators = this.request.indicators;
            var requestSpecialTax = {};
            requestSpecialTax.typeAgreement = "00" + this.request.agreements.data.agreementType.id;

            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'ADDITIONAL_VALUE':
                        requestSpecialTax.additionalValue = value.isActive ? value.value[0].name : "";
                        break;
                    case 'SELF_ADHESIVE':
                        requestSpecialTax.autoadhesive = value.isActive ? value.value[0].name : "";
                        break;
                    case 'SIZE_SELF_ADHESIVE':
                        requestSpecialTax.formatAutoadhesive = value.isActive ? value.value[0].name : "";
                        break;
                    case 'RECIPROCITY':
                        if (value.isActive) {
                            requestSpecialTax.reciprocity = true;

                        } else {
                            requestSpecialTax.reciprocity = false;
                        }

                        break;
                    case 'DISPERSION':
                        requestSpecialTax.dispersion = value.isActive;
                        break;
                    case 'DERRAMA':
                        requestSpecialTax.contributionType = value.isActive ? value.value[0].name : "";
                        break;
                    case 'NUMBER_DAYS_DEPARTMENT':
                        if (value.isActive) {
                            requestSpecialTax.departmentReciprocity = value.value[0].name;
                        } else {
                            requestSpecialTax.departmentReciprocity = 0;
                        }

                        break;
                    case 'NUMBER_DAYS_MUNICIPALITY':
                        if (value.isActive) {
                            requestSpecialTax.municipalityReciprocity = value.value[0].name;
                        } else {
                            requestSpecialTax.municipalityReciprocity = 0;
                        }
                        break;
                    case 'NUMBER_DAYS_AGREEMENT':
                        if (value.isActive) {
                            requestSpecialTax.reciprocityAssociatedAgreement = value.value[0].name;
                        } else {
                            requestSpecialTax.reciprocityAssociatedAgreement = 0;
                        }
                        break;
                    case 'PERCENT_DISPERSION_DEPARTMENT':
                        if (value.isActive) {
                            requestSpecialTax.departmentPercentage = parseInt(value.value[0].name);
                        } else {
                            requestSpecialTax.departmentPercentage = 0;
                        }
                        break;
                    case 'PERCENT_DISPERSI_MUNICIPALITY':
                        if (value.isActive) {
                            requestSpecialTax.municipalityPercentage = parseInt(value.value[0].name);
                        } else {
                            requestSpecialTax.municipalityPercentage = 0;
                        }
                        break;
                    case 'PERCENT_DISPERSION_AGREEMENT':
                        if (value.isActive) {
                            requestSpecialTax.PercentageAssociatedAgreement = parseInt(value.value[0].name);
                        } else {
                            requestSpecialTax.PercentageAssociatedAgreement = 0;
                        }
                        break;
                    case 'TYPE_DAYS_DEPARTMENT':
                        if (value.isActive) {
                            requestSpecialTax.departmentTypeDays = value.value[0].name;
                        } else {
                            requestSpecialTax.departmentTypeDays = 0;
                        }
                        break;
                    case 'TYPE_DAYS_MUNICIPALITY':
                        if (value.isActive) {
                            requestSpecialTax.municipalityTypeDay = value.value[0].name;
                        } else {
                            requestSpecialTax.municipalityTypeDay = 0;
                        }

                        break;
                    case 'TYPE_DAYS_AGREEMENT':
                        if (value.isActive) {
                            requestSpecialTax.associatedAgreementsTypeDays = value.value[0].name;
                        } else {
                            requestSpecialTax.associatedAgreementsTypeDays = 0;
                        }
                        break;
                    case 'REFUND_WAITING_ACCOUNT_D':
                        requestSpecialTax.waitingAccountsDepartment = value.isActive;
                        break;
                    case 'REFUND_WAITING_ACCOUNT_M':
                        requestSpecialTax.municipalityWaitingAccounts = value.isActive;
                        break;

                }
            });
            return requestSpecialTax;
        }

        function getFinancialTerminal() {
            var listindicators = this.request.indicators;
            var requestFinancialTer = {};
            requestFinancialTer.typeAgreement = "00" + this.request.agreements.data.agreementType.id;
            requestFinancialTer.offices = [];
            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'INDICATOR_OFFICE':
                        if (value.isActive) {
                            requestFinancialTer.type = "NAL";
                            requestFinancialTer.allOffices = true;
                            requestFinancialTer.statusOffice = false;
                        }

                        break;
                    case 'OFFICES':
                        if (value.isActive) {
                            requestFinancialTer.type = "OFI";
                            requestFinancialTer.statusOffice = true;
                            angular.forEach(value.value, function (data, key) {
                                requestFinancialTer.offices.push({
                                    officeCode: data.name
                                });
                            });
                        }
                        break;
                    case 'CENTER_OF_SERVICES':
                        if (value.isActive) {
                            requestFinancialTer.type = "CSR";
                            requestFinancialTer.statusOffice = true;
                            angular.forEach(value.value, function (data, key) {
                                requestFinancialTer.offices.push({
                                    officeCode: data.name
                                });
                            });
                        }
                        break;
                }
            });

            return requestFinancialTer;
        }

        function getReferencesInf() {
            var listReferences = this.request.references;
            var requestreferences = [];
            var taxover = false;
            var municipalityField = false;
            var validationRutine = false;
            var requiredField = "0";
            requestreferences.references = [];
            requestreferences.additionals = [];
            requestreferences.fixedValues = [];
            requestreferences.dates = [];
            requestreferences.values = [];
            requestreferences.BNET = [];
            requestreferences.MNET = [];
            requestreferences.messages = [];
            requestreferences.informationMessage = "";

            angular.forEach(listReferences.data, function (value, key) {
                switch (value.referenceType.name) {
                    case 'REF':
                        angular.forEach(value.indicator, function (data, key) {
                            switch (data.name) {
                                case 'TAX_SURCHARGE':
                                    taxover = data.isActive;
                                    break;
                                case 'FIELD_MUNICIPALITY':
                                    municipalityField = data.isActive;
                                    break;
                                case 'VALIDATION_ROUTINE':
                                    validationRutine = data.isActive;
                                    break;
                                case 'OBLIGATORY_FIELD':
                                    requiredField = data.isActive ? "1" : "0";
                                    break;
                            }
                        });
                        requestreferences.references.push({
                            "id": (requestreferences.references.length + 1),
                            "referenceId": value.referenceType.id,
                            "field": value.referenceType.id,
                            "quickHelp": value.longDescription,
                            "description": value.referenceDescription,
                            "format": value.typeFormat.id,
                            "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                            "fieldLength": value.length,
                            "inputPosition": value.positionInitial,
                            "outputPosition": value.positionOut,
                            "barLength": value.position,
                            "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() : "1",
                            "taxOver": taxover ? 'B10' : 'B08',
                            "municipalityField": municipalityField ? 'B10' : 'B08',
                            "obligatoryField": requiredField,
                        });

                        break;
                    case 'ADI':

                        requestreferences.additionals.push({
                            "id": (requestreferences.additionals.length + 1),
                            "referenceId": value.referenceType.id,
                            "field": parseInt(value.referenceType.id),
                            "quickHelp": value.longDescription,
                            "description": value.referenceDescription,
                            "format": value.typeFormat.id,
                            "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                            "fieldLength": value.length,
                            "inputPosition": value.positionInitial,
                            "outputPosition": value.positionOut,
                            "barLength": value.position,
                            "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() : "1",
                        });
                        break;
                    case 'FIJ':
                        var maximumAmount = 0;
                        var minimumAmount = 0;
                        var amountIndicator = false;

                        angular.forEach(value.indicator, function (data, key) {
                            switch (data.name) {
                                case 'INDICATOR_AMOUNT':
                                    amountIndicator = data.isActive;
                                    angular.forEach(data.limits, function (limit, key) {
                                        switch (limit.name) {
                                            case 'MAXIMUM_AMOUNT':
                                                maximumAmount = limit.value;
                                                break;
                                            case 'MINIMUM_AMOUNT':
                                                minimumAmount = limit.value;
                                                break;
                                        }
                                    });

                                    break;
                                case 'OBLIGATORY_FIELD':
                                    requiredField = data.isActive;
                                    break;
                            }
                        });
                        requestreferences.fixedValues.push({
                            "id": (requestreferences.fixedValues.length + 1),
                            "referenceId": value.referenceType.id,
                            "consecutive": parseInt(value.referenceType.id),
                            "quickHelp": value.longDescription,
                            "description": value.referenceDescription,
                            "format": value.typeFormat.id,
                            "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                            "fieldLength": value.length,
                            "inputPosition": value.positionInitial,
                            "outputPosition": value.positionOut,
                            "barLength": value.position,
                            "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() : "1",
                            "maximumAmount": maximumAmount,
                            "minimumAmount": minimumAmount,
                            "obligatoryField": requiredField,
                            "amountIndicator": amountIndicator,
                        });
                        break;
                    case 'FEC':
                        requestreferences.dates.push({
                            "id": (requestreferences.dates.length + 1),
                            "referenceId": value.referenceType.id,
                            "field": parseInt(value.referenceType.id),
                            "quickHelp": value.longDescription,
                            "description": value.referenceDescription,
                            "format": value.typeFormat.id,
                            "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                            "fieldLength": value.length,
                            "inputPosition": value.positionInitial,
                            "outputPosition": value.positionOut,
                            "lengthBars": value.position,
                            "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() : "1",
                        });
                        break;
                    case 'VAL':
                        requestreferences.values.push({
                            "id": (requestreferences.values.length + 1),
                            "referenceId": value.referenceType.id,
                            "field": parseInt(value.referenceType.id),
                            "quickHelp": value.longDescription,
                            "description": value.referenceDescription,
                            "format": value.typeFormat.id,
                            "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                            "fieldLength": value.length,
                            "inputPosition": value.positionInitial,
                            "outputPosition": value.positionOut,
                            "barLength": value.position,
                            "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() : "1",
                        });
                        break;
                    case 'MEN':

                        requestreferences.messages.push({
                            id: (requestreferences.values.length + 1),
                            "referenceId": value.referenceType.id
                        });

                        if (value.longDescription != undefined) {
                            requestreferences.informationMessage += value.referenceDescription + value.longDescription;
                        } else {
                            requestreferences.informationMessage += value.referenceDescription;
                        }

                        break;
                    case 'BNET':
                        if (value.typeFormat.id != "CN") {
                            requestreferences.BNET.push({
                                "id": (requestreferences.BNET.length + 1),
                                "referenceId": value.referenceType.id,
                                "field": parseInt(value.referenceType.id),
                                "quickHelp": value.longDescription,
                                "description": value.name,
                                "fieldType": value.typeFormat.id,
                                "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                                "fieldLength": value.length,
                                "inputPosition": value.positionInitial,
                                "outputPosition": value.positionOut,
                                "barLength": value.position,
                                "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() : "1",
                            });
                        }
                        break;
                    case 'MNET':
                        if (value.typeFormat.id != "CN") {
                            requestreferences.MNET.push({
                                "id": (requestreferences.MNET.length + 1),
                                "referenceId": value.referenceType.id,
                                "field": parseInt(value.referenceType.id),
                                "quickHelp": value.longDescription,
                                "description": value.name,
                                "fieldType": value.typeFormat,
                                "alignment": value.typeAlignment.name == "RIGHT" ? "D" : "I",
                                "fieldLength": value.length,
                                "inputPosition": value.positionInitial,
                                "outputPosition": value.positionOut,
                                "barLength": value.position,
                                "fillCharacter": value.paddingCharacters != undefined ? value.paddingCharacters.toString() :"1",
                            });
                        }
                        break;  
                }
            });
            return requestreferences;
        }

        function getCaptureType() {
            var listindicators = this.request.indicators;
            var requestCaptureType = {};
            if (this.request.agreements.data.agreementType.id == 5) {
                requestCaptureType.typeAgreement = "I";
            } else {
                requestCaptureType.typeAgreement = "R";
            }

            requestCaptureType.EANCode = parseInt(this.request.agreements.data.EANCode);

            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'CAPTURE_TYPE':
                        if (value.isActive) {
                            requestCaptureType.type = value.value[0].name;
                        } else {
                            requestCaptureType.type = "";
                        }

                        break;
                    case 'ASSOCIATE_AGREEMENT':
                        requestCaptureType.associatedAgreements = value.isActive;
                        requestCaptureType.statusAssociatedAgreements = value.isActive;
                        requestCaptureType.listStatusAssociatedAgreements = [];
                        if (requestCaptureType.associatedAgreements) {
                            angular.forEach(value.value, function (data, key) {
                                requestCaptureType.listStatusAssociatedAgreements.push({
                                    associatedAgreementCode: data.name.split('-')[0].trim(),
                                    numberAssociatedAgreement: data.name.split("-")[1].trim(),
                                    associatedAccount: data.name.split("-")[2].trim()
                                });
                            });
                        }
                        break;

                }
            });

            return requestCaptureType;
        }

        function getAccountsRC() {
            var agrement = this.request.agreements;
            var requestAccountsRC = {};
            requestAccountsRC.CtaADI = [];
            requestAccountsRC.CtaDIS = [];
            if (agrement.data.agreementType.id == 5) {
                requestAccountsRC.typeAgreement = "I";
            } else {
                requestAccountsRC.typeAgreement = "R";
            }
            angular.forEach(agrement.data.relatedContract, function (value, key) {
                switch (value.relationType.id.substring(0, 2)) {
                    case 'AD':
                        requestAccountsRC.CtaADI.push({
                            "accountNumber": value.number.trim(),
                            "type": value.product.id === '01' ? "CC" : value.product.id === '02' ? "AH" : value.product.id === '96' ? "CL" : "",
                            "idType": agrement.data.relatedParticipants[0].participantTypeId,
                            "identificationNumber": agrement.data.relatedParticipants[0].participantId.substring(1, 16),
                            "identificationDigit": agrement.data.relatedParticipants[0].participantId.substring(16, 17),
                            "percentageAgrement": value.percentage

                        });
                        break;
                    case 'TD':
                        requestAccountsRC.CtaDIS.push({
                            "code": value.relatedContractId.trim(),
                            "type": value.relationType.id.substring(2, 3),
                            "idType": value.relationType.name.substring(0, 1),
                            "identificationNumber": value.relationType.name.substring(1, value.relationType.name.length - 1),
                            "identificationDigit": value.relationType.name.substring(value.relationType.name.length - 1, value.relationType.name.length),
                            "bankCode": value.contractId,
                            "account": value.number,
                            "accountType": value.product.id,
                            "telephoneContact": value.bankId,
                            "nameContact": value.product.name.split("-")[0],
                            "returnDispersion": value.percentage,
                        });
                        break;
                }
            });

            return requestAccountsRC;
        }

        function getChannel() {
            var agrement = this.request.agreements;
            var requestChannel = {};
            requestChannel.BNET = [];
            requestChannel.MNET = [];

            if (agrement.data.agreementConfiguration != undefined) {
                angular.forEach(agrement.data.agreementConfiguration.channel, function (value, key) {
                    switch (value.name.substring(0, 4)) {
                        case 'BNET':
                            requestChannel.BNET.push({
                                "referenceId": value.id,
                                "category": value.category,
                                "subcategory": value.subCategory,
                                "format": value.dataType,
                                "imageFormat": value.descriptionChannel,
                                "domicileIndicator": value.paddingCharacters == "S" ? true : false,
                                "fixedValue" : value.name.substring(4, 5) =="S" ? true : false,
                                "status": true,
                            });
                            break;
                        case 'MNET':
                            requestChannel.MNET.push({
                                "referenceId": value.id,
                                "category": value.category,
                                "subcategory": value.subCategory,
                                "format": value.dataType,
                                "imageFormat": value.descriptionChannel,
                                "domicileIndicator": value.paddingCharacters == "S" ? true : false,
                                "fixedValue" : value.name.substring(4, 5) =="S" ? true : false,
                                "status": false

                            });
                            break;
                    }
                });
            } else {
                requestChannel.BNET.push({
                    "category": '',
                    "subcategory": '',
                    "format": '',
                    "imageFormat": '',
                    "domicileIndicator": '',
                    "status": '',
                });

                requestChannel.MNET.push({
                    "category": '',
                    "subcategory": '',
                    "format": '',
                    "imageFormat": '',
                    "domicileIndicator": '',

                });

            }
            return requestChannel;
        }

        function getPaytime() {
            var listindicators = this.request.indicators;
            var requestPayTime = {};


            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'STATE_SERVICE':
                        requestPayTime.serviceStatus = value.isActive ? "A" : "I";
                        break;
                    case 'STATE_DATE_SERVICE':
                        requestPayTime.dateStatus = value.isActive ? value.value[0].name : "";
                        break;
                    case 'BILLING_TYPE':
                        requestPayTime.facturationType = value.isActive ? value.value[0].name === 'A' ? "AJ" : "PR" : "";
                        break;
                    case 'PERIODICITY':
                        if (value.isActive) {
                            requestPayTime.frequencyReceipt = value.value[0].name;

                        } else {
                            requestPayTime.frequencyReceipt = "";
                        }

                        break;
                    case 'REFERENCE_FIXED':
                        requestPayTime.posFixedReference = value.isActive ? value.value[0].name === 'P' ? "PRI" : "SEC" : "";
                        break;
                    case 'NUMBERS_BILLING_DAY':
                        requestPayTime.numberDaysInvoiceBd = value.isActive ? value.value[0].name : "";
                        break;
                    case 'RETRIES_TYPE':
                        if (value.isActive) {
                            requestPayTime.typeIndicatorRetry = value.value[0].name === "D" ? true : false;
                        } else {
                            requestPayTime.typeIndicatorRetry = false;
                        }

                        break;
                    case 'MAXIMUM_NUMBER_RETRIES':
                        if (value.isActive) {
                            requestPayTime.maximumRetry = value.value[0].name > 5 ? "5" : value.value[0].name;
                        } else {
                            requestPayTime.maximumRetry = "0";
                        }
                        break;
                    case 'NAME_REFERENCE':
                        if (value.isActive) {
                            requestPayTime.namePaymentReference = value.value[0].name;
                        } else {
                            requestPayTime.namePaymentReference = 0;
                        }
                        break;
                    case 'OVERDUE_PAYMENT':
                        if (value.isActive) {
                            requestPayTime.indRetryType = true;
                        } else {
                            requestPayTime.indRetryType = false;
                        }
                        break;
                    case 'PARTIAL_PAYMENT':
                        if (value.isActive) {
                            requestPayTime.partialCollectionIndicator = true;
                        } else {
                            requestPayTime.partialCollectionIndicator = false;
                        }
                        break;
                    case 'MAXIMUM_NUMBER_PRODUCTS':
                        if (value.isActive) {
                            requestPayTime.maxChargeProducts = value.value[0].name;
                        } else {
                            requestPayTime.maxChargeProducts = 1;
                        }
                        break;
                    case 'LOAD_ACCOUNT':
                        if (value.isActive) {
                            requestPayTime.accountabilityIndicator = true;
                        } else {
                            requestPayTime.accountabilityIndicator = false;
                        }
                        break;
                    case 'ENROLL_CREDIT_TARJ':
                        if (value.isActive) {
                            requestPayTime.indicatorCargoTCredit = true;
                        } else {
                            requestPayTime.indicatorCargoTCredit = false;
                        }

                        break;
                    case 'MAXIMUM_NUMBER_INSTALLMENTS':
                        if (value.isActive) {
                            requestPayTime.maxChargeProductsDifer = value.value[0].name;
                        } else {
                            requestPayTime.maxChargeProductsDifer = 1;
                        }
                        break;
                }
            });
            return requestPayTime;
        }

        function getPse() {
            var listindicators = this.request.indicators;
            var requestPse = {};

            angular.forEach(listindicators.data, function (value, key) {
                switch (value.id) {
                    case 'INDICATOR_PSE':
                        if (value.isActive) {
                            requestPse.pseAgreement = value.value[0].name == 'S' ? true : false;
                        } else {
                            requestPse.pseAgreement = false;
                        }
                        console.log();
                        break;
                    case 'COUPON_PSE':
                        requestPse.coupon = value.isActive;
                        break;
                }
            });

            return requestPse
        }

        function getPin() {
            var agrement = this.request.agreements;
            var requestPin = {};
            if (agrement.data.agreementConfiguration != undefined) {
                angular.forEach(agrement.data.agreementConfiguration.pin, function (value, key) {
                    requestPin.id = value.id;
                    requestPin.name = value.name;
                    requestPin.typeId = value.pinType.id;

                    switch (value.pinType.id) {
                        case '01':
                            {
                                requestPin.typePin = "TU";
                            }
                            break;
                        case '02':
                            {
                                requestPin.typePin = "TB";
                            }
                            break;
                        case '03':
                            {
                                requestPin.typePin = "TI";
                            }
                            break;
                        case '04':
                            {
                                requestPin.typePin = "TA";
                            }
                            break;
                        default:
                            {
                                requestPin.typePin = "BD";
                            };
                    }

                    value.algorithm = '0' + value.algorithm;
                    requestPin.numericAlphanumeric = value.pinType.name;
                    requestPin.algorythm = value.algorithm === '02' ? "02" :
                        value.algorithm === '04' ? "04" :
                        value.algorithm === '08' ? "08" : "";
                    requestPin.algorythm = parseInt(requestPin.algorythm);
                    requestPin.NumberDigits = parseInt(value.value);
                });
            }

            return requestPin
        }
    }
})();
