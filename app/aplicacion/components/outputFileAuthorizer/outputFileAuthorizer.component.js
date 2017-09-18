(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileAuthorizer')
        .component("outputFileAuthorizer", {
            templateUrl: "app/aplicacion/components/outputFileAuthorizer/outputFileAuthorizer.tmpl.html",
            controller: 'OutputFileAuthorizerController',
            controllerAs: 'vm'
        });
})();
