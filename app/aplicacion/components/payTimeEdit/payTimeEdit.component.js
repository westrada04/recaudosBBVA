(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTimeEdit')
        .component("payTimeEdit", {
            templateUrl: "app/aplicacion/components/payTimeEdit/payTimeEdit.tmpl.html",
            controller: 'PayTimeEditController',
            controllerAs: 'vm'
        });
})();
