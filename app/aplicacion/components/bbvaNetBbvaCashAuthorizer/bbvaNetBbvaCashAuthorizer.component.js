(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.bbvaNetBbvaCashAuthorizer')
        .component("bbvaNetBbvaCashAuthorizer", {
            templateUrl: "app/aplicacion/components/bbvaNetBbvaCashAuthorizer/bbvaNetBbvaCashAuthorizer.tmpl.html",
            controller: 'BbvaNetBbvaCashAuthorizerController',
            controllerAs: 'vm'
        });
})();
