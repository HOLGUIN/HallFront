//Routes
(function () {
    'use strict';

    angular
        .module('app.admin')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/login");
        $urlRouterProvider.when("/", "/login");
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.admin', {
                url: '/admin',
                controller: 'AdminController',
                controllerAs: 'admin',
                templateUrl: 'components/core/admin/admin.html',
                data: {
                    moduleTitle: 'Administrador',
                    goNew: 'new',
                    goDelete: 'delete',
                    moduleName: 'admin',
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Configuración',
                    description: ''
                }

            });
    }

}());
