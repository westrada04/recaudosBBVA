(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequest')
        .controller('ConsultRequestController', ConsultRequestController);

    function ConsultRequestController($timeout, $state) {
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
                $state.go('templateAuth.consultRequestForm', {
                    typeRequest: vm.typeRequest
                });
            });
        }
    }
})();
