(function () {
    'use strict';

    angular
        .module('app.aplicacion.editRequestForm')
        .config(editRequestFormConfig);

    function editRequestFormConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.editRequestForm', {
                url: "/editRequestForm",
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
                        templateUrl: "app/aplicacion/editRequestForm/editRequestForm.tmpl.html",
                        controller: "EditRequestFormController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
