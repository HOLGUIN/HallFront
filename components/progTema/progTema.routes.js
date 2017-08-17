//Routes
(function () {
    'use strict';

    angular
        .module('app.progtema')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('app.progtema', {
                url: '/progtema',
                templateUrl: 'components/progTema/progTema.view.html',
                controller: 'progTemaController',
                controllerAs: '$ctrl'
            });
    }

}());