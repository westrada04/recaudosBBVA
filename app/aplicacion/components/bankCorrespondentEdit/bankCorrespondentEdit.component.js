(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondentEdit')
        .component("bankCorrespondentEdit", {
            templateUrl: "app/aplicacion/components/bankCorrespondentEdit/bankCorrespondentEdit.tmpl.html",
            controller: 'BankCorrespondentEditController',
            controllerAs: 'vm'
        });
})();
