(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.financialTerminalEdit')
        .factory('FinancialTerminalEditService', FinancialTerminalEditService);

    function FinancialTerminalEditService($q, $http, API_BACKEND, $sessionStorage, UserService, EditAgreementService) {

        var service = {
            createIndicatorGeneral: createIndicatorGeneral
        };

        return service;

        //////////////////////////////////////

        function createIndicatorGeneral(request, indicator) {
            var deferred = $q.defer();
            var idAgreement = EditAgreementService.getIdAgreement();

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
