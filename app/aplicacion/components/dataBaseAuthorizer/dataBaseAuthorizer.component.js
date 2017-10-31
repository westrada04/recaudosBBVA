(function () {
    'use strict';

    angular
        .module('app.aplicacion.components.dataBaseAuthorizer')
        .component("baseDataAuthorizer", {
            templateUrl: "app/aplicacion/components/dataBaseAuthorizer/dataBaseAuthorizer.tmpl.html",
            	controller: 'DataBaseAuthorizerController',
            controllerAs: 'vm'
        });
})();
