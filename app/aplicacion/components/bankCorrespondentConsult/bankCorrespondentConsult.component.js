(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondentConsult')
        .component("bankCorrespondentConsult", {
            templateUrl: "app/aplicacion/components/bankCorrespondentConsult/bankCorrespondentConsult.tmpl.html",
            controller: 'BankCorrespondentConsultController',
            controllerAs: 'vm'
        });
})();
