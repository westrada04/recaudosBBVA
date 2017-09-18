(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFileEdit')
        .component("outputFileEdit", {
            templateUrl: "app/aplicacion/components/outputFileEdit/outputFileEdit.tmpl.html",
            controller: 'OutputFileEditController',
            controllerAs: 'vm'
        });
})();
