(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondentAuthorizer')
        .component("bankCorrespondentAuthorizer", {
            templateUrl: "app/aplicacion/components/bankCorrespondentAuthorizer/bankCorrespondentAuthorizer.tmpl.html",
            controller: 'BankCorrespondentAuthorizerController',
            controllerAs: 'vm'
        });
})();
