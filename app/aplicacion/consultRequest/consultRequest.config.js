(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequest')
        .config(consultRequestConfig);

    function consultRequestConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.consultRequest', {
                url: "/consultRequest",
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/consultRequest/consultRequest.tmpl.html",
                        controller: "ConsultRequestController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
