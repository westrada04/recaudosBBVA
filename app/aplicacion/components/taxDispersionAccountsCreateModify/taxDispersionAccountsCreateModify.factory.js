(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.taxDispersionAccountsCreateModify')
        .factory('TaxDispersionAccountsCreateModifyService', TaxDispersionAccountsCreateModifyService);

    function TaxDispersionAccountsCreateModifyService($q, $http, API_BACKEND, UserService, CreateModifyAgreementService) {

        var service = {
            createAgreement: createAgreement
        };

        return service;

        //////////////////////////////////////

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
