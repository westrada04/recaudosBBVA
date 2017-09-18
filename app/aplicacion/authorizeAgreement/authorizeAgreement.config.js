(function () {
    'use strict';

    angular
        .module('app.aplicacion.authorizeAgreement')
        .config(authorizeAgreementConfig);

    function authorizeAgreementConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.authorizeAgreement', {
                url: "/authorizeAgreement",
                params: {
                    idAgreement: null
                },
                resolve: {
                    request: function ($stateParams, $timeout, $state, EditAgreementService, ConsultAgreementService, toastr) {
                         EditAgreementService.reset();
                        
                        if ($stateParams.idAgreement) {
                            EditAgreementService.setIdAgreement($stateParams.idAgreement);
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
                                    EditAgreementService.setTypeRequest(request.agreements.data.agreementType.id);
                                    return true;
                                }).catch(function (error) {
                                    toastr.error(error.data["error-message"], 'Error');
                                    $timeout(function () {
                                        $state.go('templateAuth.consultRequestPending');
                                    });
                                });

                        } else {
                            $timeout(function () {
                                $state.go('templateAuth.consultRequestPending');
                            });
                        }
                    }
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/authorizeAgreement/authorizeAgreement.tmpl.html",
                        controller: "AuthorizeAgreementController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
