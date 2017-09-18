(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestPending')
        .factory('RequestPendingService', RequestPendingService);

    function RequestPendingService($q, $http, API_BACKEND, UserService) {
        var service = {
            getRequestPending: getRequestPending
        };

        return service;

        //////////////////////////////////////

        function getRequestPending() {
            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01?estado=E", UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();
