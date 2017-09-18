(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bankCorrespondent')
        .component("bankCorrespondent", {
            templateUrl: "app/aplicacion/components/bankCorrespondent/bankCorrespondent.tmpl.html",
            controller: 'BankCorrespondent',
            controllerAs: 'vm'
        });
})();
