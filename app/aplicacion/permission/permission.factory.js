(function () {
    'use strict';

    angular
        .module('app.permission')
        .factory('PermissionService', PermissionService);

    function PermissionService() {

        var service = {
            getRoles: getRoles,
            getPermissions: getPermissions
        }

        return service;

        //////////////////////////////////////

        function getRoles() {
            var roles = {
                'TRANSACTIONAL': ['manageApplications', 'createRequest', 'editRequest', 'viewRequest', 'viewRequestRejected', 'viewRequestApproved', 'manageReports', 'generateReports'],
                'AUTORIZATOR': ['manageApplications', 'viewRequest', 'administerAgreements', 'viewPendingAgreements', 'viewRejectedAgreements', 'viewApprovedAgreements'],
                'CONSULT': ['manageApplications', 'viewRequest', 'manageReports', 'generateReports'],
                'SUPER_USER': ['manageProfiles', 'createProfile'],
                'ADMINISTRATOR': ['manageApplications', 'createRequest', 'editRequest', 'viewRequest', 'administerAgreements', 'viewPendingAgreements', 'viewRejectedAgreements', 'viewApprovedAgreements', 'manageUsers', 'createUser', 'editUser', 'viewUser'],
                'AUDITORY': ['manageApplications', 'manageReports', 'generateReports']
            }
            return roles;
        }

        function getPermissions() {
            var permissions = ['manageApplications', 'createRequest', 'editRequest', 'viewRequest', 'viewRequestRejected', 'viewRequestApproved', 'administerAgreements', 'viewPendingAgreements', 'viewRejectedAgreements', 'viewApprovedAgreements', 'manageUsers', 'createUser', 'editUser', 'viewUser', 'manageProfiles', 'createProfile', 'manageReports', 'generateReports'];

            return permissions;
        }

    }
})();
