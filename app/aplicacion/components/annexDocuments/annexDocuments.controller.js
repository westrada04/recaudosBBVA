(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.annexDocuments')
        .controller('AnnexDocumentsController', AnnexDocumentsController);

    function AnnexDocumentsController(toastr) {
        var vm = this;
        vm.save = save;

        function save() {
            toastr.info('Modulo no Implementado', 'Informacion !');
        }
    }
})();
