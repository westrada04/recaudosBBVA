(function () {
    'use strict';

    angular
        .module('app.aplicacion.editRequest')
        .controller('EditRequestController', EditRequestController);

    function EditRequestController($timeout, $state) {
        var vm = this;
        vm.continuar = continuar;

        vm.typeRequests = [
            {
                nombre: "Recaudo Nacional",
                value: "R"
            },
            {
                nombre: "Impuestos",
                value: "I"
            }
        ];


        function continuar() {
            $timeout(function () {
                $state.go('templateAuth.editRequestForm', {
                    typeRequest: vm.typeRequest
                });
            });
        }
    }
})();
