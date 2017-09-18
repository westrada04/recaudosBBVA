(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestRejected')
        .config(consultRequestRejectedConfig);

    function consultRequestRejectedConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.consultRequestRejected', {
                url: "/consultRequestRejected",
                resolve: {
                    rejectedRequests: function (RequestRejectedService, $timeout, $state, toastr) {
                        return RequestRejectedService.getRequestRejected()
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
                        templateUrl: "app/aplicacion/consultRequestRejected/consultRequestRejected.tmpl.html",
                        controller: "ConsultRequestRejectedController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
