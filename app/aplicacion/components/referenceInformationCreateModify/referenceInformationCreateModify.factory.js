(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.referenceInformationCreateModify')
        .factory('ReferenceInformationCreateModifyService', ReferenceInformationCreateModifyService);

    function ReferenceInformationCreateModifyService($q, $http, API_BACKEND, $sessionStorage, UserService, CreateModifyAgreementService) {

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
            deleteMessage: deleteMessage
        };

        return service;

        //////////////////////////////////////

        function createReferences(requests) {
            var idAgreement = CreateModifyAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
            });

            return $q.allSettled(promises);
        }

        function deleteReference(referenceId) {
            var idAgreement = CreateModifyAgreementService.getIdAgreement();
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
            var idAgreement = CreateModifyAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
            });

            return $q.allSettled(promises);
        }

        function createFixedValues(requests) {
            var idAgreement = CreateModifyAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
            });

            return $q.allSettled(promises);
        }

        function createDate(request) {
            var idAgreement = CreateModifyAgreementService.getIdAgreement();
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
            var idAgreement = CreateModifyAgreementService.getIdAgreement();
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
            var idAgreement = CreateModifyAgreementService.getIdAgreement();

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
            return references;
        }

        function setReferences(referencias) {
            references = referencias;
        }

    }
})();
