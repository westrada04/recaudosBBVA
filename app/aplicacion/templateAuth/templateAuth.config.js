(function () {
    'use strict';

    angular
        .module('app.aplicacion.templateAuth')
        .config(templateConfig);

    function templateConfig($stateProvider) {

        $stateProvider
            .state('templateAuth', {
                abstract: true,
                resolve: {
                    auth: function (UserService, $timeout, $state) {
                        return UserService.authenticatedUser()
                            .then(function (response) {
                            }, function (error) {
                                $timeout(function () {
                                    $state.go('template.login');
                                });
                            });
                    },
                },
                views: {
                    'root': {
                        templateUrl: 'app/aplicacion/templateAuth/templateAuth.tmpl.html',
                        controller: 'TemplateAuthController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
