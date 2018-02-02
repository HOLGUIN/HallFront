//Routes
(function () {
    'use strict';

    angular
        .module('app.clase.profesor')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.clase-profesor', {
                url: '/ClaseProf/:hlnclaseid',
                templateUrl: 'components/clase/profesor/clase.view.html',
                controller: 'ClasepController',
                controllerAs: '$ctrl'
            });
    }
}());
