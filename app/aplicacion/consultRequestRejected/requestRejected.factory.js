(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestRejected')
        .factory('RequestRejectedService', RequestRejectedService);

    function RequestRejectedService($q, $http, API_BACKEND, UserService) {
        var service = {
            getRequestRejected: getRequestRejected
        };

        return service;

        //////////////////////////////////////

        function getRequestRejected() {
            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01?estado=R", UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();
