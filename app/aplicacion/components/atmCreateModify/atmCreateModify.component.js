(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.atmCreateModify')
        .component("atmCreateModify", {
            templateUrl: "app/aplicacion/components/atmCreateModify/atmCreateModify.tmpl.html",
            controller: 'AtmCreateModifyController',
            controllerAs: 'vm'
        });
})();
