(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalData')
        .factory('GeneralDataService', GeneralDataService);

    function GeneralDataService($q, $http, API_BACKEND, $sessionStorage, UserService, CreateAgreementService) {

        var requestAgreement = {};
        var service = {
            setRequestAgreement: setRequestAgreement,
            getRequestAgreement: getRequestAgreement,
            createAgreement: createAgreement,
            createIndicatorListGneral: createIndicatorListGneral,
            createIndicatorGeneral: createIndicatorGeneral,
            reset: reset
        };

        return service;

        //////////////////////////////////////

        function createAgreement(request, stateIdAgrement) {
            var deferred = $q.defer();

            if (stateIdAgrement) {
                $http.post(API_BACKEND.url + "/agreements/V01", request, UserService.getTsec())
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
            } else {
                var idAgreement = CreateAgreementService.getIdAgreement();

                $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement, request, UserService.getTsec())
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }

        function createIndicatorListGneral(requests, indicator) {
            var idAgreement = CreateAgreementService.getIdAgreement();
            var promises = requests.map(function (request) {
                return $http.put(API_BACKEND.url + "/agreements/V01/" + idAgreement + '/indicators/' + indicator, request, UserService.getTsec())
            });

            return $q.all(promises);
        }

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

        function setRequestAgreement(requestAgreement) {
            this.requestAgreement = requestAgreement;
        }

        function getRequestAgreement() {
            return this.requestAgreement;
        }

        function reset(){
            this.requestAgreement = {};
        }
    }
})();
