(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBankingConsult')
        .component("mobileBankingConsult", {
            templateUrl: "app/aplicacion/components/mobileBankingConsult/mobileBankingConsult.tmpl.html",
            controller: 'MobileBankingConsultController',
            controllerAs: 'vm'
        });
})();
