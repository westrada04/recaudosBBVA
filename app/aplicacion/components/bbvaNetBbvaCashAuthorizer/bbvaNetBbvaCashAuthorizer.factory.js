(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashAuthorizer')
        .factory('BbvaNetBbvaCashAuthorizerService', BbvaNetBbvaCashAuthorizerService);

    function BbvaNetBbvaCashAuthorizerService($q, $http, API_BACKEND, UserService, EditAgreementService) {

        var service = {
            createAgreement: createAgreement,
            createReferences: createReferences
        };

        return service;

        //////////////////////////////////////

        function createReferences(requests) {
            var idAgreement = EditAgreementService.getIdAgreement();

            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/references/' + request.referenceId, request, UserService.getTsec())
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


    }
})();
