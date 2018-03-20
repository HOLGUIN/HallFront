//Routes
(function () {
    'use strict';

    angular
        .module('app.clasealumno')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.clase-alumno', {
                url: '/ClaseAlum/:hlnclaseid',
                templateUrl: 'components/clase/alumno/clase.view.html',
                controller: 'ClaseController',
                controllerAs: '$ctrl'
            });
    }
}());
