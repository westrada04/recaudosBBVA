(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestForm')
        .factory('ConsultRequestService', ConsultRequestService);

    function ConsultRequestService($q, $http, API_BACKEND, UserService) {
        var service = {
            getRequestTypeAgreement: getRequestTypeAgreement,
            getRequestIdentificacion: getRequestIdentificacion,
            getRequestTypeRequest: getRequestTypeRequest,
            getRequestDescription: getRequestDescription
        };

        return service;

        //////////////////////////////////////

        function getRequestTypeAgreement(form) {
            var deferred = $q.defer();
            var n = form.agreementCode.length;
            var t = 7 - n;
            var agreementCode = '';

            for (var i = 0; i < t; i++) {
                agreementCode += '0';
            }
            agreementCode += form.agreementCode;

            var agrementId = form.typeAgreement + agreementCode + form.classAgreement;

            $http.get(API_BACKEND.url + "/agreements/V01/" + agrementId, UserService.getTsec())
                .then(function (response) {
                    console.log(response);
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getRequestIdentificacion(form) {
            var deferred = $q.defer();

            var url = '';
            var participantId = '';
            var n = '';
            var t = '';
            var identificationNumber = '';

            if (form.ver != undefined) {
                n = form.identificationNumber.length;
                t = 15 - n;
                identificationNumber = '';

                for (var i = 0; i < t; i++) {
                    identificationNumber += '0';
                }
                identificationNumber += form.identificationNumber;
                participantId = form.identificationType + identificationNumber + form.ver;
                url = '&participantId=' + participantId;
            } else {
                form.ver = 0;
                n = form.identificationNumber.length;
                t = 15 - n;
                identificationNumber = '';

                for (var i = 0; i < t; i++) {
                    identificationNumber += '0';
                }
                identificationNumber += form.identificationNumber;
                participantId = form.identificationType + identificationNumber + form.ver;
                url = '&participantId=' + participantId;
            }

            $http.get(API_BACKEND.url + "/agreements/V01?" + url, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;

        }

        function getRequestTypeRequest(form) {
            var deferred = $q.defer();
            var agrementId = form.requestNumber;

            $http.get(API_BACKEND.url + "/agreements/V01/" + agrementId, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getRequestDescription(form) {
            var deferred = $q.defer();
            var agreementType = 300;
            var observa = form.agreementDescription;
            var url = '&observa=' + observa;

            $http.get(API_BACKEND.url + "/agreements/V01?" + url, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    }
})();
