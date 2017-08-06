(function () {
    'use strict';

    angular
        .module('app.admin.profiles')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/login");
        $urlRouterProvider.when("/", "/login");
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.admin.profiles', {
                url: '/profiles',
                controller: ['item', '$scope', function (item, $scope) {
                    var self = this;
                    self.item = item;
                }],
                controllerAs: '$ctrl',
                template: '<profiles items="$ctrl.item"></profiles>',
                data: {
                    moduleTitle: 'Perfiles',
                    goNew: 'new',
                    goDelete: 'delete',
                    moduleName: 'perfiles',
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Perfiles',
                    description: ''
                },
                resolve: {
                    item: ['$q', '$http', 'API_URL_ADMIN', function ($q, $http, API_URL_ADMIN) {

                        return $q(function (resolve, reject) {

                            $http({
                                url: API_URL_ADMIN + '/perfiles',
                                method: 'GET'
                            }).then(function (promise) {
                                resolve(promise.data);
                            }, function (reason) {
                                reject(reason);
                            });

                        });

                    }]

                }
            })
            .state('app.admin.profiles.create', {
                url: '/create',
                controllerAs: '$ctrl',
                template: '<profiles-create></profiles-create>',
                data: {
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Crear',
                    description: ''
                }

            })
            .state('app.admin.profiles.update', {
                url: '/:id/update',
                controllerAs: '$ctrl',
                template: '<profiles-update></profiles-update>',
                data: {
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Modificar',
                    description: ''
                }
            });

    }

}());
