(function () {
    'use strict';

    angular
        .module('app.aplicacion.login')
        .factory('UserService', UserService);

    function UserService($q, $http, $sessionStorage, API_BACKEND, API_BACKEND_GT, PermPermissionStore, PermRoleStore, PermissionService, $state) {
        var service = {
            getCurrentUser: getCurrentUser,
            hasPermission: hasPermission,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            authenticatedUser: authenticatedUser,
            getUser: getUser,
            getTsec: getTsec
        };

        return service;

        //////////////////////////////////////

        function getCurrentUser() {
            return $sessionStorage.user;
        }

        function hasPermission(permission) {
            var deferred = $q.defer();
            var hasPermission = false;
            var currentUser = getCurrentUser();

            if (currentUser !== undefined) {
                var role = currentUser.rol;
                if (PermRoleStore.getRoleDefinition(role)) {
                    var roles = PermissionService.getRoles();
                    if (angular.isDefined(roles[role])) {
                        angular.forEach(roles[role], function (value, key) {
                            if (value == permission) {
                                hasPermission = true;
                            }
                        });
                    }
                }
            }
            if (hasPermission) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        function login(loginForm) {
            var deferred = $q.defer();

            var gt = {
                authentication: {
                    userID: loginForm.user,
                    consumerID: "12000008",
                    authenticationType: "13",
                    authenticationData: [{
                        idAuthenticationData: "password",
                        authenticationData: [
                            loginForm.password
                        ]

                    }]
                },
                backendUserRequest: {
                    userId: "",
                    accessCode: "",
                    dialogId: ""
                }
            }

            $http.post(API_BACKEND_GT.url, gt, getCross())
                .then(function (response) {
                    $sessionStorage.tsec = response.headers("tsec");
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logout() {
            $sessionStorage.$reset();
            $state.go('template.login');
        }

        function isAuthenticated() {
            return true;
        }

        function authenticatedUser() {
            var deferred = $q.defer();

            if ($sessionStorage.tsec) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
            return deferred.promise;
        }

        function getTsec() {
            var config = {
                headers: {
                    tsec: $sessionStorage.tsec
                },
                withCredentials: false,
                crossDomain: false
            }
            return config;
        }

        function getCross() {
            var config = {
                withCredentials: false,
                crossDomain: false
            }
            return config;
        }

        function getUser(userName) {
            var deferred = $q.defer();

            $http.get(API_BACKEND.url + "/employees/V00/employees/" + userName, getTsec())
                .then(function (response) {
                    var email = "";
                    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                    angular.forEach(response.data.contactDetails, function (value, key) {
                        if (value.contactDetail.contactType.id == "EMAIL") {
                            if(emailRegex.test(value.contactDetail.contact)){ 
                                email = value.contactDetail.contact;
                            }
                        }
                    });

                    var user = {
                        id: response.data.employeeId,
                        nombres: response.data.firstName.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, ''),
                        apellidos: response.data.lastName.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, ''),
                        email: email,
                        idPerfil: response.data.classifications[0].classification.id,
                        rol: setRole(response.data.classifications[0].classification.id)
                    }

                    //eliminar
                    //user.rol = 'TRANSACTIONAL';

                    $sessionStorage.user = user;
                    deferred.resolve(response);
                }, function (error) {

                    // error en el servicio 
                    /*
                    var user = {
                        id: "12",
                        nombres: "wilmer omar",
                        apellidos: "estrada diaz",
                        email: "westrada04@gmail.com",
                        idPerfil: "123456",
                        rol: 'TRANSACTIONAL'
                    }
                    $sessionStorage.user = user;
                    */
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function setRole(Perfil) {
            switch (Perfil) {
                case '707':
                    return 'TRANSACTIONAL';
                    break;
                case 'R83':
                    return 'TRANSACTIONAL';
                    break;
                case '74D':
                    return 'TRANSACTIONAL';
                    break;
                case '883':
                    return 'AUTORIZATOR';
                    break;
                case '717':
                    return 'CONSULT';
                    break;
                case '884':
                    return 'CONSULT';
                    break;
                case 'C06':
                    return 'CONSULT';
                    break;
                case '021':
                    return 'ADMINISTRATOR';
                    break;
                case '704':
                    return 'AUDITORY';
                    break;
                default:
                    return 'SUPER_USER';
                    break;
            }
        }
    }
})();
