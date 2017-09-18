(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.accountsReceivable')
        .factory('AccountsReceivableService', AccountsReceivableService);

    function AccountsReceivableService($q, $http, API_BACKEND, UserService, CreateAgreementService) {

        var service = {
            createAgreement: createAgreement
        };

        return service;

        //////////////////////////////////////

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


    }
})();
