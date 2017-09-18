(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCash')
        .component("bbvaNetBbvaCash", {
            templateUrl: "app/aplicacion/components/bbvaNetBbvaCash/bbvaNetBbvaCash.tmpl.html",
            controller: 'BbvaNetBbvaCashController',
            controllerAs: 'vm'
        });
})();
