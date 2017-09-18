(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBankingCreateModify')
        .component("mobileBankingCreateModify", {
            templateUrl: "app/aplicacion/components/mobileBankingCreateModify/mobileBankingCreateModify.tmpl.html",
            controller: 'MobileBankingCreateModifyController',
            controllerAs: 'vm'
        });
})();
