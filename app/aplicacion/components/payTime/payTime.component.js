(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTime')
        .component("payTime", {
            templateUrl: "app/aplicacion/components/payTime/payTime.tmpl.html",
            controller: 'PayTimeController',
            controllerAs: 'vm'
        });
})();
