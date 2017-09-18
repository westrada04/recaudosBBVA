(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondentCreateModify')
        .component("bankCorrespondentCreateModify", {
            templateUrl: "app/aplicacion/components/bankCorrespondentCreateModify/bankCorrespondentCreateModify.tmpl.html",
            controller: 'BankCorrespondentCreateModifyController',
            controllerAs: 'vm'
        });
})();
