(function () {
    'use strict';

    angular
        .module('app.aplicacion.createModifyAgreement')
        .config(createModifyAgreementConfig);

    function createModifyAgreementConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.createModifyAgreement', {
                url: "/createModifyAgreement",
                params: {
                    idAgreement: null
                },
                resolve: {
                    request: function ($stateParams, $timeout, $state, CreateModifyAgreementService, ConsultAgreementService, toastr) {
                        CreateModifyAgreementService.reset();
                        if ($stateParams.idAgreement) {
                            CreateModifyAgreementService.setIdAgreement($stateParams.idAgreement);
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
                                    CreateModifyAgreementService.setTypeRequest(request.agreements.data.agreementType.id);
                                    return true;
                                }).catch(function (error) {
                                    toastr.error(error.data["error-message"], 'Error');
                                    $timeout(function () {
                                        $state.go('templateAuth.createRequest');
                                    });
                                });

                        } else {
                            $timeout(function () {
                                $state.go('templateAuth.createRequest');
                            });
                        }
                    }
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/createModifyAgreement/createModifyAgreement.tmpl.html",
                        controller: "CreateModifyAgreementController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
