(function () {
    'use strict';

    angular
        .module('app.aplicacion.template')
        .config(templateConfig);

    function templateConfig($stateProvider) {

        $stateProvider
            .state('template', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'app/aplicacion/template/template.tmpl.html',
                        controller: 'TemplateController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
