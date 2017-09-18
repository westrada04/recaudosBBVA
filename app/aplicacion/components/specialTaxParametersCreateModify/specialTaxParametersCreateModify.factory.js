(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.specialTaxParametersCreateModify')
        .factory('SpecialTaxParametersCreateModifyService', SpecialTaxParametersCreateModifyService);

    function SpecialTaxParametersCreateModifyService($q, $http, API_BACKEND, $sessionStorage, UserService, CreateModifyAgreementService) {

        var service = {
            createIndicatorGen: createIndicatorGen
        };

        return service;

        //////////////////////////////////////

        function createIndicatorGen(request, indicator) {
            var deferred = $q.defer();
            var idAgreement = CreateModifyAgreementService.getIdAgreement();

            $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/indicators/' + indicator, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    }
})();
