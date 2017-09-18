(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBase')
        .factory('DataBaseService', DataBaseService);

    function DataBaseService($q, $http, API_BACKEND, $sessionStorage, UserService, CreateAgreementService) {

        var service = {
            createIndicatorGeneral: createIndicatorGeneral
        };

        return service;

        //////////////////////////////////////

        function createIndicatorGeneral(request, indicator) {
            var deferred = $q.defer();
            var idAgreement = CreateAgreementService.getIdAgreement();

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
