(function () {
    'use strict';

    angular
        .module('app.aplicacion.queryReports')
        .config(queryReportsConfig);

    function queryReportsConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.queryReports', {
                url: "/queryReports",
                params: {
                    typeRequest: null
                },
                resolve: {
                    typeRequest: function ($stateParams,$timeout,$state) {
                        if ($stateParams.typeRequest != null) {
                            return $stateParams.typeRequest;
                        } else {
                            $timeout(function () {
                                $state.go('templateAuth.generateReports');
                            });
                        }
                    }
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/queryReports/queryReports.tmpl.html",
                        controller: "QueryReportsController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
