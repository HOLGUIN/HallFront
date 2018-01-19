//Routes
(function () {
    'use strict';

    angular
        .module('app.clasesprofesor')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.clasesprofesor', {
                url: '/Clasesprofesor',
                templateUrl: 'components/clasesProfesor/clasesprofesor.view.html',
                controller: 'ClasesProfesorController',
                controllerAs: '$ctrl'
            });
    }

}());
