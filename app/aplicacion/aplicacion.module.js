(function () {
    'use strict';

    angular
        .module('app.aplicacion', [
            'app.permission',
            'app.aplicacion.template',
            'app.aplicacion.templateAuth',
            'app.aplicacion.login',
            'app.aplicacion.home',
            'app.aplicacion.createRequest',
            'app.aplicacion.createAgreement',
            'app.aplicacion.createModifyAgreement',
            'app.aplicacion.editAgreement',
            'app.aplicacion.consultAgreement',
            'app.aplicacion.editRequestForm',
            'app.aplicacion.consultRequestForm',
            'app.aplicacion.consultRequestApproved',
            'app.aplicacion.consultRequestRejected',
            'app.aplicacion.consultRequestPending',
            'app.aplicacion.authorizeAgreement',
            'app.aplicacion.generateReports',
            'app.aplicacion.queryReports',
            'app.aplicacion.components'
        ]);
})();
