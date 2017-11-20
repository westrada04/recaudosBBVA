(function () {
    'use strict';

    angular
        .module('app.aplicacion.authorizeAgreement')
        .controller('AuthorizeAgreementController', AuthorizeAgreementController);

    function AuthorizeAgreementController($timeout, $state, toastr, EditAgreementService, GeneralDataEditService, ConsultAgreementService, $scope, AuthorizeAgreementService) {
        var vm = this;
        // resetear datos generales y referencias
        GeneralDataEditService.reset();
        AuthorizeAgreementService.reset();
        //ReferenceInformationService.reset();
        
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        vm.idAgreement = ConsultAgreementService.getRequest().agreements.data.idAgreement;
        
        $scope.$on('idAgreement', function (evt, value) {
            vm.idAgreement = value;
        });

        if (vm.typeRequest == 'R') {
            vm.isTax = false;
        } else if (vm.typeRequest == 'I') {
            vm.isTax = true;
        }

        vm.createRequest = createRequest;
        vm.editRequest = editRequest;
        vm.consultRequest = consultRequest;
        vm.print = print;
        vm.save = save;
        vm.rechazar=rechazar;

        vm.state1 = true;
        vm.state2 = false;
        vm.state3 = false;
        vm.progress = 33;

        function createRequest() {
            $timeout(function () {
                $state.go('templateAuth.createRequest');
            });
        }

        function editRequest() {
            $timeout(function () {
                $state.go('templateAuth.editRequestForm');
            });
        }

        function consultRequest() {
            $timeout(function () {
                $state.go('templateAuth.consultRequestForm');
            });
        }

        
        function print() {
            
        }

        function save() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement();
            var indBd;
            vm.state3=false;
            requestAgrement.status.id = 'F';
            requestAgrement.status.name = 'Finalizado';
            requestAgrement.status.statusType.id = 'F';
            requestAgrement.status.statusType.name = 'Finalizado';
            indBd = AuthorizeAgreementService.getJsonBd();
            
            var myPromise = EditAgreementService.createAgreement(requestAgrement)
                .then(function (response) {
                      toastr.info('Solicitud Aprobada!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                }).catch(function (error) {
                    toastr.error('Error al Autorizar la Solicitud <br>' + error.data["error-message"], 'Error');
                });

            if (requestAgrement.idAgreement.substring(1, 3) == '300') {
                var myPromise = GeneralDataEditService.createIndicatorList(indBd).
                then(function(response){
                    toastr.info('Indicadores ok!', 'Informacion !');
                }).catch(function(error){
                    toastr.info('Fallo!', 'Informacion !'); 
                });
            
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }
        }
        function rechazar() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement();
            if (requestAgrement.idAgreement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            requestAgrement.status.id = 'R';
            requestAgrement.status.name = 'Rechazado';
            requestAgrement.status.statusType.id = 'R';
            requestAgrement.status.statusType.name = 'Rechazado';

            var myPromise = EditAgreementService.modifyAgreement(requestAgrement)
                .then(function (response) {
                    toastr.info('Registro Almacenado Exitosamente!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
    }
})();
