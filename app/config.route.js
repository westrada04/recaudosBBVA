(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('404', {
                url: '/404',
                views: {
                    'root': {
                        templateUrl: '404.tmpl.html'
                    }
                }
            })

            .state('401', {
                url: '/401',
                views: {
                    'root': {
                        templateUrl: '401.tmpl.html'
                    }
                }
            })

            .state('500', {
                url: '/500',
                views: {
                    'root': {
                        templateUrl: '500.tmpl.html'
                    }
                }
            });
        
            $urlRouterProvider.when('', '/login');
            
            //$urlRouterProvider.otherwise('/404');
        
            $urlRouterProvider.otherwise( function($injector) {
                var $state = $injector.get("$state");
                $state.go('/404');
            });
    }
})();
