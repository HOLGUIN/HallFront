//Routes
(function () {
    'use strict';

    angular
        .module('app.asignatura')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.asignatura', {
                url: '/asignaturas',
                templateUrl: 'components/asignatura/asignatura.view.html',
                controller: 'AsignaturaController',
                controllerAs: '$ctrl'
            });
    }

}());
