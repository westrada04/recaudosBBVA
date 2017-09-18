(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileAuthorizer')
        .factory('OutputFileAuthorizerService', OutputFileAuthorizerService);

    function OutputFileAuthorizerService($q, $http, API_BACKEND, $sessionStorage, UserService, EditAgreementService) {

        var service = {
            outputFileType: '',
            getOutputFileType: function () {
                return this.outputFileType;
            },
            setOutputFileType: function (outputFileType) {
                this.outputFileType = outputFileType;
            },
            createIndicatorGeneral: createIndicatorGeneral,
            createAgreement: createAgreement
        };

        return service;

        //////////////////////////////////////

        function createIndicatorGeneral(request, indicator) {
            var deferred = $q.defer();
            var idAgreement = EditAgreementService.getIdAgreement();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/indicators/' + indicator, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function createAgreement(request) {
            var deferred = $q.defer();
            var idAgreement = EditAgreementService.getIdAgreement();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();
