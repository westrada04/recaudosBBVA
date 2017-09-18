(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.mobileBanking')
        .component("mobileBanking", {
            templateUrl: "app/aplicacion/components/mobileBanking/mobileBanking.tmpl.html",
            controller: 'MobileBankingController',
            controllerAs: 'vm'
        });
})();
