(function () {
    'use strict';

    angular
        .module('app.aplicacion.login')
        .controller('LoginController', LoginController);

    function LoginController(UserService, toastr, $state) {
        var vm = this;

        vm.myPromise;
        vm.loginForm = {
            user: '',
            password: ''
        };

        vm.login = login;

        function login() {
            vm.myPromise = UserService.login(vm.loginForm)
                .then(function (response) {
                    return UserService.getUser(vm.loginForm.user);
                }).then(function () {
                    toastr.info('Sesion iniciada con exito.', 'Informacion !');
                    $state.go('templateAuth.home');
                }).catch(function (error) {
                    console.log("error: ", error);
                    console.log('mensaje de error', error.data["error-message"]);
                    toastr.error('Tu usuario o contraseña es incorrecta.', 'Error');
                    //  $state.go('templateAuth.home');
                });
        }
    }

})();
