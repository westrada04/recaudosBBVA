(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestRejected')
        .controller('ConsultRequestRejectedController', ConsultRequestRejectedController);

    function ConsultRequestRejectedController(rejectedRequests) {
        var vm = this;

        if (rejectedRequests.data == undefined) {
            rejectedRequests.data = [];
        }

        vm.rejectedRequests = rejectedRequests.data;
        vm.itemsByPage = 5;
        vm.numberPages = 0;
        var items = Object.keys(vm.rejectedRequests).length;

        if (items != 0) {
            var numberPages = items / vm.itemsByPage;

            if (numberPages - Math.trunc(numberPages) > 0) {
                vm.numberPages = Math.trunc(numberPages) + 1;
            }

        }

    }
})();
