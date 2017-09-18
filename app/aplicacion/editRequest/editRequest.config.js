(function () {
    'use strict';

    angular
        .module('app.aplicacion.editRequest')
        .config(editRequestConfig);

    function editRequestConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.editRequest', {
                url: "/editRequest",
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/editRequest/editRequest.tmpl.html",
                        controller: "EditRequestController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
