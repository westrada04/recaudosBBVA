(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.outputFile')
        .component("outputFile", {
            templateUrl: "app/aplicacion/components/outputFile/outputFile.tmpl.html",
            controller: 'OutputFileController',
            controllerAs: 'vm'
        });
})();
