(function () {
    'use strict';

    angular
        .module('app.aplicacion.createAgreement')
        .config(createAgreementConfig);

    function createAgreementConfig($stateProvider) {

        $stateProvider
            .state('templateAuth.createAgreement', {
                url: "/createAgreement",
                params: {
                    typeRequest: null
                },
                resolve: {
                    typeRequest: function ($stateParams, $timeout, $state, CreateAgreementService) {
                        CreateAgreementService.reset();
                        if ($stateParams.typeRequest != null) {
                            CreateAgreementService.setTypeRequest($stateParams.typeRequest);
                            return $stateParams.typeRequest;
                        } else {
                            $timeout(function () {
                                $state.go('templateAuth.createRequest');
                            });
                        }
                    }
                },
                views: {
                    'contenido': {
                        templateUrl: "app/aplicacion/createAgreement/createAgreement.tmpl.html",
                        controller: "CreateAgreementController",
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
