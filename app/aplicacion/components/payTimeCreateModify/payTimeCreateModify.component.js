(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTimeCreateModify')
        .component("payTimeCreateModify", {
            templateUrl: "app/aplicacion/components/payTimeCreateModify/payTimeCreateModify.tmpl.html",
            controller: 'PayTimeCreateModifyController',
            controllerAs: 'vm'
        });
})();
