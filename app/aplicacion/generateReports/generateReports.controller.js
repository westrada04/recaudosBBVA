(function () {
    'use strict';

    angular
        .module('app.aplicacion.generateReports')
        .controller('GenerateReportsController', GenerateReportsController);

    function GenerateReportsController($timeout, $state) {
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
                $state.go('templateAuth.queryReports', {
                    typeRequest: vm.typeRequest
                });
            });
        }
    }
})();
