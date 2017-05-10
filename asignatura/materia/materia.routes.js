//Routes
(function () {
    'use strict';

    angular
        .module('app.asignatura.materia')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.asignatura.materia', {
                url: '/materias',
                templateUrl: 'components/asignatura/materia/materia.view.html',
                controller: 'MateriaController',
                controllerAs: '$ctrl'
            });
    }

} ());
