(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBankingEdit')
        .factory('MobileBankingEditService', MobileBankingEditService);

    function MobileBankingEditService($q, $http, API_BACKEND, UserService, EditAgreementService) {

        var idReference;

        var service = {
            setIdReference: setIdReference,
            getIdReference: getIdReference,
            createAgreement: createAgreement,
            createReferences: createReferences
        };

        return service;

        //////////////////////////////////////

        function createReferences(requests) {
            var idAgreement = EditAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                console.log('request.referenceId', request.referenceId);
                if (request.referenceId == '99000') {
                    return $http.post(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
                } else {
                    return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
                }
            });
            return $q.allSettled(promises);
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

        function setIdReference(idReference) {
            this.idReference = idReference;
        }

        function getIdReference() {
            return this.idReference;
        }
    }
})();
