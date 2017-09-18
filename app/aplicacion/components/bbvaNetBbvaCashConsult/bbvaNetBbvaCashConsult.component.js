(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashConsult')
        .component("bbvaNetBbvaCashConsult", {
            templateUrl: "app/aplicacion/components/bbvaNetBbvaCashConsult/bbvaNetBbvaCashConsult.tmpl.html",
            controller: 'BbvaNetBbvaCashConsultController',
            controllerAs: 'vm'
        });
})();
