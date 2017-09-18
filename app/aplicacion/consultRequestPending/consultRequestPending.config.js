(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestPending')
        .config(consultRequestPendingConfig);

    function consultRequestPendingConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.consultRequestPending', {
                url: "/consultRequestPending",
                resolve: {
                    pendingRequests: function (RequestPendingService, $timeout, $state, toastr) {
                        return RequestPendingService.getRequestPending()
                            .then(function (response) {
                                return response.data;
                            }, function (error) {
                                $timeout(function () {
                                    toastr.error(error.data["error-message"], 'Error');
                                    $state.go('templateAuth.home');
                                });
                            });
                    },
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/consultRequestPending/consultRequestPending.tmpl.html",
                        controller: "ConsultRequestPendingController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
