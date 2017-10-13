(function () {
    'use strict';

    angular
        .module('app.aplicacion.authorizeAgreement')
        .controller('AuthorizeAgreementController', AuthorizeAgreementController);

    function AuthorizeAgreementController($timeout, $state, toastr, EditAgreementService, GeneralDataEditService, ConsultAgreementService, $scope) {
        var vm = this;

        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        vm.idAgreement = ConsultAgreementService.getRequest().agreements.data.idAgreement;

        // resetear datos generales y referencias
        GeneralDataEditService.reset();
        //ReferenceInformationService.reset();
        
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
        vm.after1 = after1;
        vm.after2 = after2;
        vm.next1 = next1;
        vm.next2 = next2;
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

        function next1() {
            vm.progress = 66;
            vm.state1 = false;
            vm.state2 = true;
        }

        function after1() {
            vm.progress = 33;
            vm.state1 = true;
            vm.state2 = false;
        }

        function next2() {
            vm.progress = 100;
            vm.state1 = true;
            vm.state2 = true;
            vm.state3 = true;
        }

        function after2() {
            vm.progress = 66;
            vm.state3 = false;
            vm.state1 = false;
            vm.state2 = true;
        }

        function print() {
            
        }

        function save() {
            var requestAgrement = GeneralDataEditService.getRequestAgreement();
            if (requestAgrement == undefined) {
                toastr.info('Debe guardar Datos Generales para realizar este registro!', 'Informacion !');
                return;
            }

            requestAgrement.status.id = 'E';
            requestAgrement.status.name = 'Enviado';
            requestAgrement.status.statusType.id = 'E';
            requestAgrement.status.statusType.name = 'Enviado';

            var myPromise = EditAgreementService.createAgreement(requestAgrement)
                .then(function (response) {
                      toastr.info('Registro Almacenado Exitosamente!', 'Informacion !');
                    GeneralDataEditService.setRequestAgreement(requestAgrement);
                }).catch(function (error) {
                    toastr.error('Registro no Exitoso <br>' + error.data["error-message"], 'Error');
                });
        }
        function rechazar() {

            var requestAgrement = GeneralDataEditService.getRequestAgreement();
            if (requestAgrement == undefined) {
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
