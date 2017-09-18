(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashCreateModify')
        .factory('BbvaNetBbvaCashCreateModifyService', BbvaNetBbvaCashCreateModifyService);

    function BbvaNetBbvaCashCreateModifyService($q, $http, API_BACKEND, UserService, CreateModifyAgreementService) {

        var service = {
            createAgreement: createAgreement,
            createReferences: createReferences
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

        function createAgreement(request) {
            var deferred = $q.defer();
            var idAgreement = CreateModifyAgreementService.getIdAgreement();

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
