(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBankingEdit')
        .component("mobileBankingEdit", {
            templateUrl: "app/aplicacion/components/mobileBankingEdit/mobileBankingEdit.tmpl.html",
            controller: 'MobileBankingEditController',
            controllerAs: 'vm'
        });
})();
