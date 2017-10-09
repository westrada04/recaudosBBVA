(function () {
    'use strict';

    angular
        .module('app.aplicacion.editAgreement')
        .factory('EditAgreementService', EditAgreementService);

    function EditAgreementService($q, $http, API_BACKEND, UserService, $sessionStorage) {

        var idAgreement;
        var typeRequest;

        var request = {
            agreements: '',
            indicators: '',
            references: ''
        };

        var service = {
            getUser: getUser,
            createAgreement: createAgreement,
            modifyAgreement: modifyAgreement,
            setRequest: setRequest,
            getRequest: getRequest,
            setTypeRequest: setTypeRequest,
            getTypeRequest: getTypeRequest,
            setIdAgreement: setIdAgreement,
            getIdAgreement: getIdAgreement,
            getAgreement: getAgreement,
            getIndicator: getIndicator,
            getReference: getReference,
            reset: reset
        };

        return service;

        //////////////////////////////////////

        function getUser() {
            return $sessionStorage.user;
        }
        function modifyAgreement(request) {
            var deferred = $q.defer();

            $http.put(API_BACKEND.url + "/agreements/V01/" + this.idAgreement, request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function createAgreement(request) {
            var deferred = $q.defer();

            $http.post(API_BACKEND.url + "/agreements/V01/", request, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function setTypeRequest(typeRequest) {
            if (typeRequest == 5) {
                this.typeRequest = "I";
            } else {
                this.typeRequest = "R";
            }
        }

        function getTypeRequest() {
            return this.typeRequest;
        }

        function getAgreement() {

            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01/" + this.idAgreement, UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIndicator() {

            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01/" + this.idAgreement + '/indicators', UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getReference() {

            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/agreements/V01/" + this.idAgreement + '/references', UserService.getTsec())
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function setIdAgreement(idAgreement) {
            this.idAgreement = idAgreement;

        }

        function getIdAgreement() {
            return this.idAgreement;
        }

        function setRequest(request) {
            this.request = request;
        }

        function getRequest() {
            return this.request;
        }
        function reset(){
            this.idAgreement = '';
            this.typeRequest = '';
            this.request = {
                agreements: '',
                indicators: '',
                references: ''
            };
        }

    }
})();
