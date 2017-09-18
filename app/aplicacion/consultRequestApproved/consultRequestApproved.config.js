(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestApproved')
        .config(consultRequestApprovedConfig);

    function consultRequestApprovedConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.consultRequestApproved', {
                url: "/consultRequestApproved",
                resolve: {
                    approvedRequests: function (RequestApprovedService, $timeout, $state, toastr) {
                        return RequestApprovedService.getRequestApproved()
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
                        templateUrl: "app/aplicacion/consultRequestApproved/consultRequestApproved.tmpl.html",
                        controller: "ConsultRequestApprovedController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
