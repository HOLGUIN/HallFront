//Routes
(function () {
    'use strict';

    angular
        .module('app.tomarclase')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.tomarclase', {
                url: '/tomarclase',
                templateUrl: 'components/tomarClase/tomarclase.view.html',
                controller: 'tomarclaseController',
                controllerAs: '$ctrl'
            });
    }

}());