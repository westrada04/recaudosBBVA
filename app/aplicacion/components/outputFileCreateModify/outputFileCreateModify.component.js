(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileCreateModify')
        .component("outputFileCreateModify", {
            templateUrl: "app/aplicacion/components/outputFileCreateModify/outputFileCreateModify.tmpl.html",
            controller: 'outputFileCreateModifyController',
            controllerAs: 'vm'
        });
})();
