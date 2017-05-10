(function () {
    'use strict';

    angular
        .module('app.admin.companies.users')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/login");
        $urlRouterProvider.when("/", "/login");
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.admin.companies.users', {
                abstract: true,
                url: '/users',
                controllerAs: '$ctrl',
                template: '<users ></users>',
                data:{
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Usuarios',
                    description: ''
                }
            })
            .state('app.admin.companies.users.create', {
                url: '/:id/create',
                controllerAs: '$ctrl',
                template: '<users-create></users-create>',
                data:{
                    show: true
                },
                ncyBreadcrumb: {
                    //parent: 'companies.update',
                    label: 'Crear Usuario',
                    description: ''
                }
            })
            .state('app.admin.companies.users.update', {
                url: '/:id/update',
                controller: ['item', '$scope', function (item, $scope) {
                    var self = this;
                    self.item = item;
                }],
                controllerAs: '$ctrl',
                template: '<users-update items="$ctrl.item"></users-update>',
                data:{
                    show: true
                },
                ncyBreadcrumb: {
                  // parent: 'companies.update',
                    label: 'Modificar Usuario',
                    description: ''
                },
                resolve: {
                    item: ['$q', '$http', 'API_URL_ADMIN', '$stateParams', function ($q, $http, API_URL_ADMIN, $stateParams) {

                        var userId = $stateParams.id;

                        return $q(function (resolve, reject) {

                            $http({
                                url: API_URL_ADMIN + '/users/' + userId,
                                method: 'GET'
                            })
                                .then(function (promise) {
                                    resolve(promise.data);
                                }, function (reason) {
                                    console.log('----error getUser ROUTE----');
                                    reject(reason);
                                });

                        });

                    }]

                }
            });

    }

}());
