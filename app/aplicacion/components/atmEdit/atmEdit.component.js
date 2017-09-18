(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.atmEdit')
        .component("atmEdit", {
            templateUrl: "app/aplicacion/components/atmEdit/atmEdit.tmpl.html",
            controller: 'AtmEditController',
            controllerAs: 'vm'
        });
})();
