(function () {
    'use strict';

    angular
        .module('app.admin.companies')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/login");
        $urlRouterProvider.when("/", "/login");
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.admin.companies', {
                url: '/companies',
                controller: ['item', '$scope', function (item, $scope) {
                    var self = this;
                    self.item = item;
                }],
                controllerAs: '$ctrl',
                template: '<companies items="$ctrl.item"></companies>',
                data: {
                    moduleTitle: 'Compañias',
                    goNew: 'new',
                    goDelete: 'delete',
                    moduleName: 'empresa',
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Empresas',
                    description: ''
                },
                resolve: {
                    item: ['$q', '$http', 'API_URL_ADMIN', function ($q, $http, API_URL_ADMIN) {

                        return $q(function (resolve, reject) {

                            $http({
                                url: API_URL_ADMIN + '/empresa',
                                method: 'GET'
                            })
                                .then(function (promise) {
                                    resolve(promise.data);
                                }, function (error) {
                                    reject({'companies error': error});
                                });
                        });
                    }]

                }
            })
            .state('app.admin.companies.create', {
                url: '/create',
                subModule: 'app.admin.companies.users',
                controllerAs: '$ctrl',
                template: '<companies-create></companies-create>',
                data:{
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Crear Empresas',
                    description: ''
                }
            })
            .state('app.admin.companies.update', {
                url: '/:id/update',
                subModule: 'app.admin.companies.users',
                subModuleName: 'users',
                controller: ['item', '$scope', function (item, $scope) {
                    var self = this;
                    self.item = item;
                }],
                controllerAs: '$ctrl',
                template: '<companies-update items="$ctrl.item"></companies-update>',
                data:{
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Modificar Empresas',
                    description: ''
                },
                resolve: {
                    item: ['$q', '$http', 'API_URL_ADMIN', '$stateParams', function ($q, $http, API_URL_ADMIN, $stateParams) {

                        var companyId = $stateParams.id;

                        return $q(function (resolve, reject) {

                            $http({
                                url: API_URL_ADMIN + '/empresa/' + companyId,
                                method: 'GET'
                            })
                                .then(function (promise) {
                                    resolve(promise.data);
                                }, function (reason) {
                                    reject(reason);
                                });
                        });

                    }]

                }
            });

    }

}());
