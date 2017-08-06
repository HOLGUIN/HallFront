//Routes
(function () {
    'use strict';

    angular
        .module('app.asignatura.tema')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.asignatura.tema', {
                url: '/temas',
                templateUrl: 'components/asignatura/tema/tema.view.html',
                controller: 'TemaController',
                controllerAs: '$ctrl'
            });
    }

} ());
