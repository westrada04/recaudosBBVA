(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformation')
        .factory('ReferenceInformationService', ReferenceInformationService);

    function ReferenceInformationService($q, $http, API_BACKEND, $sessionStorage, UserService, CreateAgreementService) {

        var references = [];
        
        var service = {
            getReferences: getReferences,
            setReferences: setReferences,
            createReferences: createReferences,
            deleteReference: deleteReference,
            createAdditionals: createAdditionals,
            createFixedValues: createFixedValues,
            createDate: createDate,
            createValue: createValue,
            createMessage: createMessage,
            deleteMessage: deleteMessage,
            reset: reset
        };

        return service;

        //////////////////////////////////////

        function createReferences(requests) {
            var idAgreement = CreateAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
            });

            return $q.allSettled(promises);
        }

        function deleteReference(referenceId) {
            var idAgreement = CreateAgreementService.getIdAgreement();
            var deferred = $q.defer();

            $http.delete(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + referenceId, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function createAdditionals(requests) {
            var idAgreement = CreateAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
            });

            return $q.allSettled(promises);
        }

        function createFixedValues(requests) {
            var idAgreement = CreateAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
            });

            return $q.allSettled(promises);
        }

        function createDate(request) {
            var idAgreement = CreateAgreementService.getIdAgreement();
            var deferred = $q.defer();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function createValue(request) {
            var idAgreement = CreateAgreementService.getIdAgreement();
            var deferred = $q.defer();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function createMessage(request) {
            var deferred = $q.defer();
            var idAgreement = CreateAgreementService.getIdAgreement();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function deleteMessage(request) {
            var deferred = $q.defer();
            var idAgreement = CreateAgreementService.getIdAgreement();

            $http.delete(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getReferences() {
            return this.references;
        }

        function setReferences(references) {
            this.references = references;
        }

        function reset(){
            this.references = [];
        }

    }
})();
