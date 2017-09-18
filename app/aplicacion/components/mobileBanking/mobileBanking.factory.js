(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBanking')
        .factory('MobileBankingService', MobileBankingService);

    function MobileBankingService($q, $http, API_BACKEND, UserService, CreateAgreementService) {

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
            var idAgreement = CreateAgreementService.getIdAgreement();
            // aca se descrimina si es post o put dependiendo del tipo de referenceId;
            var promises = requests.map(function (request) {
                if (false) {
                    //if (request.referenceId == '99000') {
                    return $http.post(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
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

        function setIdReference(idReference) {
            this.idReference = idReference;
        }

        function getIdReference() {
            return this.idReference;
        }

    }
})();
