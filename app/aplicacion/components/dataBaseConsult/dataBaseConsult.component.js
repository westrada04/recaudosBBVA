(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseConsult')
        .component("baseDataConsult", {
            templateUrl: "app/aplicacion/components/dataBaseConsult/dataBaseConsult.tmpl.html",
            controller: 'dataBaseConsultController',
            controllerAs: 'vm'
        });
})();
