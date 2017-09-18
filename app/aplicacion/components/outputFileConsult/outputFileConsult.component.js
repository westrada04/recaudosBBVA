(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileConsult')
        .component("outputFileConsult", {
            templateUrl: "app/aplicacion/components/outputFileConsult/outputFileConsult.tmpl.html",
            controller: 'OutputFileConsultController',
            controllerAs: 'vm'
        });
})();
