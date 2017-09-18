(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestPending')
        .controller('ConsultRequestPendingController', ConsultRequestPendingController);

    function ConsultRequestPendingController(pendingRequests, $timeout ,$state) {
        var vm = this;

        if (pendingRequests.data == undefined) {
            pendingRequests.data = [];
        }

        vm.authorize = authorize;

        vm.pendingRequests = pendingRequests.data;
        vm.itemsByPage = 5;
        vm.numberPages = 0;
        var items = Object.keys(vm.pendingRequests).length;

        if (items != 0) {
            var numberPages = items.length / vm.itemsByPage;

            if (numberPages - Math.trunc(numberPages) > 0) {
                vm.numberPages = Math.trunc(numberPages) + 1;
            }
        }

        function authorize(idAgreement) {
            $timeout(function () {
                $state.go('templateAuth.authorizeAgreement', {
                    idAgreement: idAgreement
                });
            });
        }
    }
})();
