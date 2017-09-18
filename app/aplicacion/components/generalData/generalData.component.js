(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalData')
        .component("generalData", {
            templateUrl: "app/aplicacion/components/generalData/generalData.tmpl.html",
            controller: 'GeneralDataController',
            controllerAs: 'vm'
        });
})();
