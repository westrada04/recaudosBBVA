(function () {
    'use strict';

    angular
        .module('app.aplicacion.home')
        .config(homeConfig);

    function homeConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.home', {
                url: "/home",
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/home/home.tmpl.html",
                        controller: "HomeController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
