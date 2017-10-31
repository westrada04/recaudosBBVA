(function () {
    'use strict';

    angular
        .module('app.aplicacion.authorizeAgreement')
        .factory('AuthorizeAgreementService', AuthorizeAgreementService);

    function AuthorizeAgreementService() {

        var idAgreement;
        var typeRequest;
        var requestbd ={}; 
        var service = {
            getBd: getBd,
            setBd: setBd,
            reset: reset
        };

        return service;

        //////////////////////////////////////

        function getBd() {
            return requestbd;
        }
        function setBd(requestbd1) {
            requestbd = requestbd1;
        }

        function reset(){
            requestbd = {};
        }
        
    }
})();
