(function () {
    'use strict';

    angular
        .module('app.aplicacion.templateAuth')
        .controller('TemplateAuthController', TemplateAuthController);

    function TemplateAuthController(UserService, toastr, $state) {
        var vm = this;
        vm.user = UserService.getCurrentUser();
        vm.logout = logout;

        function logout() {
            UserService.logout();
            toastr.info('Sesion finalizada con exito.', 'Informacion !');
        }
    }

})();
