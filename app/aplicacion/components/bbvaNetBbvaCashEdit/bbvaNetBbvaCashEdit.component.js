(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashEdit')
        .component("bbvaNetBbvaCashEdit", {
            templateUrl: "app/aplicacion/components/bbvaNetBbvaCashEdit/bbvaNetBbvaCashEdit.tmpl.html",
            controller: 'BbvaNetBbvaCashEditController',
            controllerAs: 'vm'
        });
})();
