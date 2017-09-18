(function () {
    'use strict';

    angular
        .module('app.aplicacion.createAgreement')
        .factory('CreateAgreementService', CreateAgreementService);

    function CreateAgreementService($q, $http, API_BACKEND, UserService, $sessionStorage) {

        var service = {
            typeRequest: '',
            idAgreement: '',
            setTypeRequest: setTypeRequest,
            getTypeRequest: getTypeRequest,
            setIdAgreement: setIdAgreement,
            getIdAgreement: getIdAgreement,
            getUser: getUser,
            createAgreement: createAgreement,
            reset:reset
        };

        return service;

        //////////////////////////////////////

        function setTypeRequest(typeRequest) {
            this.typeRequest = typeRequest;
        }

        function getTypeRequest() {
            return this.typeRequest
        }

        function setIdAgreement(idAgreement) {
            this.idAgreement = idAgreement;
        }

        function getIdAgreement() {
            return this.idAgreement;
        }

        function getUser() {
            return $sessionStorage.user;
        }

        function createAgreement(request) {
            var deferred = $q.defer();

            $http.put(API_BACKEND.url + "/agreements/V01/" + this.idAgreement, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function reset(){
            this.typeRequest = '';
            this.idAgreement = '';   
        }

    }
})();
