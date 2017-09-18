(function () {
    'use strict';

    angular
        .module('app.aplicacion.createRequest')
        .config(createRequestConfig);

    function createRequestConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.createRequest', {
                url: "/createRequest",
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/createRequest/createRequest.tmpl.html",
                        controller: "CreateRequestController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
