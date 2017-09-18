(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseCreateModify')
        .component("baseDataCreateModify", {
            templateUrl: "app/aplicacion/components/dataBaseCreateModify/dataBaseCreateModify.tmpl.html",
            controller: 'DataBaseCreateModifyController',
            controllerAs: 'vm'
        });
})();
