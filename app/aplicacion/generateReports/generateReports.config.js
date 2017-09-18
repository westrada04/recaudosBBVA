(function () {
    'use strict';

    angular
        .module('app.aplicacion.generateReports')
        .config(generateReportsConfig);

    function generateReportsConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.generateReports', {
                url: "/generateReports",
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/generateReports/generateReports.tmpl.html",
                        controller: "GenerateReportsController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
