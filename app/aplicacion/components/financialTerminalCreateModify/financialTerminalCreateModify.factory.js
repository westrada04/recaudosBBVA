(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalCreateModify')
        .factory('FinancialTerminalCreateModifyService', FinancialTerminalCreateModifyService);

    function FinancialTerminalCreateModifyService($q, $http, API_BACKEND, $sessionStorage, UserService, CreateModifyAgreementService) {

        var service = {
            createIndicatorGeneral: createIndicatorGeneral
        };

        return service;

        //////////////////////////////////////

        function createIndicatorGeneral(request, indicator) {
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
