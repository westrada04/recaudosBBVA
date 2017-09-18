(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestApproved')
        .factory('RequestApprovedService', RequestApprovedService);

    function RequestApprovedService($q, $http, API_BACKEND, UserService) {
        var service = {
            getRequestApproved: getRequestApproved
        };

        return service;

        //////////////////////////////////////

        function getRequestApproved() {
            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01?estado=F", UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();
