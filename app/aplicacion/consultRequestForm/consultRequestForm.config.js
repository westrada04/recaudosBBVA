(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestForm')
        .config(consultRequestFormConfig);

    function consultRequestFormConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.consultRequestForm', {
                url: "/consultRequestForm",
                params: {
                    typeRequest: null
                },
                resolve: {
                    typeRequest: function ($stateParams,$timeout,$state) {
                        if ($stateParams.typeRequest != null) {
                            return $stateParams.typeRequest;
                        }
                    }
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/consultRequestForm/consultRequestForm.tmpl.html",
                        controller: "ConsultRequestFormController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
