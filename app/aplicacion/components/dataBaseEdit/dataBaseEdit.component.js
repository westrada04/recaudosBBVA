(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseEdit')
        .component("baseDataEdit", {
            templateUrl: "app/aplicacion/components/dataBaseEdit/dataBaseEdit.tmpl.html",
            controller: 'DataBaseEditController',
            controllerAs: 'vm'
        });
})();
