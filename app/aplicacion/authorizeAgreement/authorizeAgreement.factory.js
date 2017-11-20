(function () {
    'use strict';

    angular
        .module('app.aplicacion.authorizeAgreement')
        .factory('AuthorizeAgreementService', AuthorizeAgreementService);

    function AuthorizeAgreementService() {

        var idAgreement;
        var typeRequest;
        var requestbd ={}; 
        var service = {
            getBd: getBd,
            setBd: setBd,
            reset: reset,
            getJsonBd : getJsonBd
        };

        return service;

        //////////////////////////////////////

        function getBd() {
            return requestbd;
        }
        function setBd(requestbd1) {
            requestbd = requestbd1;
        }

        function reset(){
            requestbd = {};
        }
        function getJsonBd(){
           
            var requestDatabase =[];
            // Tipo de Base de Datos
            requestDatabase.push({
                "name": "TYPE_VALIDATION_DATA",
                "isActive": requestbd.databaseType != "",
                "limits": [{
                    start: "",
                    end: ""
                }],
                "value": [{
                    id: requestbd.databaseType,
                    name: requestbd.databaseType
                }],
            });
            if (requestbd.databaseType != "N") {

                // Valida Fecha 1
                 requestDatabase.push({
                    "name": "FIRST_EXPIRATION_DAT",
                    "isActive": requestbd.date1,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }],
                });

                // valida fecha 2
                requestDatabase.push({
                    "name": "SECOND_EXPIRATION_DA",
                    "isActive": requestbd.date2,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }],
                });

                // Valida Fecha Encab
                requestDatabase.push({
                    "name": "VALIDATE_HEADER_DATE",
                    "isActive": requestbd.dateEncab,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                });

                // Valida Fecha Det 1
                requestDatabase.push({
                    "name": "VALIDATE_DETAIL_DATE",
                    "isActive": requestbd.dateDet1,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                });

                // Recibe más de un pago
                requestDatabase.push({
                    "name": "RECEIVES_MORE_ONE_PA",
                    "isActive": requestbd.morePayment,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }],
                });

                // Valida Valor 1
                requestDatabase.push({
                    "name": 'VALUE_1',
                    "isActive": requestbd.valor1,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                });

                // Valida Valor 2
                requestDatabase.push({
                    "name": 'VALUE_2',
                    "isActive": requestbd.valor2,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": "",
                        "name": ""
                    }]
                });

                // Numero de Ciclos
                requestDatabase.push({
                    "name": "NUMBER_OF_CYCLES",
                    "isActive": true,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": requestbd.numberCycles,
                        "name": requestbd.numberCycles
                    }]
                });

                // Ciclos de Actualización
                requestDatabase.push({
                    "name": "CHARGE_DATABASE",
                    "isActive": requestbd.updateCycle != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": requestbd.updateCycle,
                        "name": requestbd.updateCycle
                    }]
                });

                // tipo de transmicion   
                requestDatabase.push({
                    "name": "TYPE_TRANSMISSION",
                    "isActive": true,
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": '0',
                        "name": '0'
                    }]
                });

                // Días de Borrado Fecha de Vencimient
                requestDatabase.push({
                    "name": "DAYS_DELETE_EXPIRATI",
                    "isActive": requestbd.dueDate != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": requestbd.dueDate,
                        "name": requestbd.dueDate
                    }]
                });

                // Llave de Carga
                requestDatabase.push({
                    "name": "KEY_LOAD",
                    "isActive": requestbd.loadKeys != "",
                    "limits": [{
                        "start": "",
                        "end": ""
                    }],
                    "value": [{
                        "id": requestbd.loadKey,
                        "name": requestbd.loadKey
                    }]
                }); 
            }
            return requestDatabase;
        }
    }
})();
