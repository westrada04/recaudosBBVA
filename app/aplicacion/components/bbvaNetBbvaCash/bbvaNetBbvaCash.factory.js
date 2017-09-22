(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCash')
        .factory('BbvaNetBbvaCashService', BbvaNetBbvaCashService);

    function BbvaNetBbvaCashService($q, $http, API_BACKEND, UserService, CreateAgreementService) {

        var service = {
            createAgreement: createAgreement,
            createReferences: createReferences,
            deleteReference: deleteReference
        };

        return service;

        //////////////////////////////////////

        function createReferences(requests) {
            var idAgreement = CreateAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                if (request.referenceId == '99000') {
                    var listRequest = [];
                    listRequest.push(request);
                    return $http.post(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references', listRequest, UserService.getTsec())
                } else {
                    return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
                }
            });

            return $q.allSettled(promises);
        }

        function createAgreement(request) {
            var deferred = $q.defer();
            var idAgreement = CreateAgreementService.getIdAgreement();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
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

    }
})();
