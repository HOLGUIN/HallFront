//Routes
(function () {
    'use strict';

    angular
        .module('app.misclases')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.misclases', {
                url: '/misclases',
                templateUrl: 'components/misClases/misClases.view.html',
                controller: 'misclasesController',
                controllerAs: '$ctrl'
            });
    }

}());