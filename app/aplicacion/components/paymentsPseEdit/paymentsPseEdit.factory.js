(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.paymentsPseEdit')
        .factory('PaymentsPseEditService', PaymentsPseEditService);

    function PaymentsPseEditService($q, $http, API_BACKEND, $sessionStorage, UserService, EditAgreementService) {

        var service = {
            createIndicatorGen: createIndicatorGen
        };

        return service;

        //////////////////////////////////////

        function createIndicatorGen(request, indicator) {
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
