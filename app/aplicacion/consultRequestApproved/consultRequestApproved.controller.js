(function () {
    'use strict';

    angular
        .module('app.aplicacion.consultRequestApproved')
        .controller('ConsultRequestApprovedController', ConsultRequestApprovedController);

    function ConsultRequestApprovedController(approvedRequests) {
        var vm = this;
        
        if (approvedRequests.data == undefined) {
            approvedRequests.data = [];
        }
        
        vm.approvedRequests = approvedRequests.data;
        vm.itemsByPage = 5;
        vm.numberPages = 0;
        var items = Object.keys(vm.approvedRequests).length;

        if (items != 0) {
            var numberPages = items.length / vm.itemsByPage;

            if (numberPages - Math.trunc(numberPages) > 0) {
                vm.numberPages = Math.trunc(numberPages) + 1;
            }

        }
    }
})();
