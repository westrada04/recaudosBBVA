(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBase')
        .component("baseData", {
            templateUrl: "app/aplicacion/components/dataBase/dataBase.tmpl.html",
            controller: 'DataBaseController',
            controllerAs: 'vm'
        });
})();
