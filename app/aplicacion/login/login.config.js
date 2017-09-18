(function () {
    'use strict';

    angular
        .module('app.aplicacion.login')
        .config(loginConfig);

    function loginConfig($stateProvider) {

        $stateProvider
            .state('template.login', {
                url: "/login",
                views:{
                    'contenido':{
                        templateUrl: "app/aplicacion/login/login.tmpl.html",
                        controller: "LoginController",
                        controllerAs: 'vm'    
                    }
                }
            });
    }
})();
