(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.payTimeAuthorizer')
        .component("payTimeAuthorizer", {
            templateUrl: "app/aplicacion/components/payTimeAuthorizer/payTimeAuthorizer.tmpl.html",
            controller: 'PayTimeAuthorizerController',
            controllerAs: 'vm'
        });
})();
