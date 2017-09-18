(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultAgreement')
        .config(consultAgreementConfig);

    function consultAgreementConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.consultAgreement', {
                url: "/consultAgreement",
                params: {
                    idAgreement: null
                },
                resolve: {
                    request: function ($stateParams, $timeout, $state, ConsultAgreementService, toastr) {
                        if ($stateParams.idAgreement) {
                            ConsultAgreementService.setIdAgreement($stateParams.idAgreement);
                            var request = {
                                agreements: '',
                                indicators: '',
                                references: ''
                            };
                            return ConsultAgreementService.getAgreement()
                                .then(function (response) {
                                    request.agreements = response.data;
                                    return ConsultAgreementService.getIndicator();
                                }).then(function (response) {
                                    request.indicators = response.data;
                                    return ConsultAgreementService.getReference();
                                }).then(function (response) {
                                    request.references = response.data;
                                    toastr.info('Consulta Exitosa!', 'Informacion !');
                                    ConsultAgreementService.setRequest(request);
                                    return true;
                                }).catch(function (error) {
                                    toastr.error(error.data["error-message"], 'Error');
                                    $timeout(function () {
                                        $state.go('templateAuth.consultRequest');
                                    });
                                });

                        } else {
                            $timeout(function () {
                                $state.go('templateAuth.consultRequest');
                            });
                        }
                    }
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/consultAgreement/consultAgreement.tmpl.html",
                        controller: "ConsultAgreementController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
