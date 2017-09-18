(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.generalDataEdit')
        .component("generalDataEdit", {
            templateUrl: "app/aplicacion/components/generalDataEdit/generalDataEdit.tmpl.html",
            controller: 'GeneralDataEditController',
            controllerAs: 'vm'
        });
})();
