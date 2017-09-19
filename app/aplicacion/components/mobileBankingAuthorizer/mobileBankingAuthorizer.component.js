(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBankingAuthorizer')
        .component("mobileBankingAuthorizer", {
            templateUrl: "app/aplicacion/components/mobileBankingAuthorizer/mobileBankingAuthorizer.tmpl.html",
            controller: 'MobileBankingAuthorizerController',
            controllerAs: 'vm'
        });
})();
