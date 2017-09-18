(function () {
    'use strict';

    angular
        .module('app.aplicacion.queryReports')
        .factory('QueryReportsService', QueryReportsService);

    function QueryReportsService($q, $http, API_BACKEND, UserService) {
        var service = {
            getReportStatistical: getReportStatistical,
            getRequest: getRequest
        };

        return service;

        //////////////////////////////////////

        function getReportStatistical(agreementNumber, numberRequest, identificationNumber, startDate, finalDate) {
            var deferred = $q.defer();

            var urlParams = "$filter";
            var aux = 0;

            if (agreementNumber != undefined && agreementNumber != '') {
                urlParams = urlParams + "=agreementNumber==" + agreementNumber;
                aux++;
            }

            if (numberRequest != undefined) {
                var agreementNumero = "";
                if (numberRequest.length < 7) {
                    for (var i = numberRequest.length; i < 7; i++) {
                        agreementNumero = agreementNumero + "0";
                    }
                }
                agreementNumero = agreementNumero + numberRequest;
                urlParams = urlParams + "=agreementNumber==" + agreementNumero;
                aux++;
            }

            if (aux != 0 && identificationNumber != undefined) {
                urlParams = urlParams + ";id==" + identificationNumber;
                aux++;
            }
            if (aux === 0 && identificationNumber != undefined) {
                urlParams = urlParams + "=id==" + identificationNumber;
                aux++;
            }

            if (startDate != undefined && finalDate != undefined && aux != 0) {
                var fechaInicial = startDate.split('/')[0];
                var fechaFinal = finalDate.split('/')[0];
                urlParams = urlParams + ";startDate==" + fechaInicial + ";endDate==" + fechaFinal;
            }
            if (startDate != undefined && finalDate != undefined && aux === 0) {
                var fechaInicial = startDate.split('/')[0];
                var fechaFinal = finalDate.split('/')[0];
                urlParams = urlParams + "=startDate==" + fechaInicial + ";endDate==" + fechaFinal;
            }

            $http.get(API_BACKEND.url + "/statisticalReports/V01/?" + urlParams, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getRequest(executive, state, identificationNumber, creationDate, endDate) {
            var deferred = $q.defer();

            var aux = 0;
            var urlParams = '';

            if (executive != undefined) {
                urlParams = urlParams + "executive=" + executive;
                aux++;
            }
            if (aux != 0 && state != undefined) {
                urlParams = urlParams + "&estado=" + state;
                aux++;
            }
            if (aux === 0 && state != undefined) {
                urlParams = urlParams + "estado=" + state;
            }

            if (aux != 0 && identificationNumber != undefined) {
                urlParams = urlParams + "&participantId" + identificationNumber;
                aux++;
            }
            if (aux === 0 && identificationNumber != undefined) {
                urlParams = urlParams + "participantId" + identificationNumber;
                aux++;
            }

            if (creationDate != undefined && endDate != undefined && aux != 0) {
                var creationDate = creationDate.split('/')[0];
                var fechaFinal = endDate.split('/')[0];
                urlParams = urlParams + "&startDate=" + creationDate + "&finalDate=" + fechaFinal;
            }
            if (creationDate != undefined && endDate != undefined && aux === 0) {
                var creationDate = creationDate.split('/')[0];
                var fechaFinal = endDate.split('/')[0];
                urlParams = urlParams + "startDate=" + creationDate + "&finalDate=" + fechaFinal;
            }

            $http.get(API_BACKEND.url + "/agreements/V01?" + urlParams, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    }
})();
