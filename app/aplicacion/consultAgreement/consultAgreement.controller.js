(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultAgreement')
        .controller('ConsultAgreementController', ConsultAgreementController);

    function ConsultAgreementController($timeout, $state, CreateAgreementService, ConsultAgreementService) {
        var vm = this;

        vm.idAgreement = ConsultAgreementService.getRequest().agreements.data.idAgreement;
        vm.typeRequest = ConsultAgreementService.gettypeRequest();
        
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
                $state.go('templateAuth.editRequest');
            });
        }

        function consultRequest() {
            $timeout(function () {
                $state.go('templateAuth.consultRequest');
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

        }
    }
})();
