 (function () {
    'use strict';

    angular
        .module('app.admin.auditoria')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when("", "/login");
        $urlRouterProvider.when("/", "/login");
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app.admin.auditoria', {
                url: '/auditoria',
                controller: ['item', '$scope', function (item, $scope) {                
                    var self = this;            
                    self.item = item;
                }],
                controllerAs: '$ctrl',
                template: '<auditoria items="$ctrl.item"></auditoria>',

                data: {
                    moduleTitle: 'Auditoria',
                    goNew: 'new',
                    goDelete: 'delete',
                    moduleName: 'auditoria',
               //   subModule: 'app.admin.auditoria.indices',
                    show: true
                },
                ncyBreadcrumb: {
                    label: 'Auditoria',
                    description: ''
                },
                resolve: {
                    item: ['$q', '$http', 'API_URL_ADMIN', function ($q, $http, API_URL_ADMIN) {

                        return $q(function (resolve, reject) {

                            $http({
                                url: API_URL_ADMIN + '/auditoria',
                                method: 'GET'
                            })
                                .then(function (promise) {                                
                                    resolve(promise.data);
                                    //return promise.data;
                                }, function (reason) {
                                    reject(reason);
                                });

                        });

                    }]

                }                
            })

               .state('app.admin.auditoria.details', {
                 url: '/:id/details',
                  controllerAs: '$ctrl',
                  subModule: 'app.admin.auditoria.detalles',
                  subModuleName: 'detalles',
                  data:{
                  show: true
                  },
                  template: '<auditoria-details></auditoria-details>',
                  
                  ncyBreadcrumb: {
                      label: 'Detalles',
                      description: ''
                  }
               })
    }
          //   .state('app.admin.auditorias.create', {
                // url: '/create',
                // subModule: 'app.admin.auditoria.users',
                 // controllerAs: '$ctrl',
                 // template: '<auditoria-create></auditoria-create>',
                 // data:{
                 //     show: true
                 // },
                 // ncyBreadcrumb: {
                 //     label: 'Crear Auditoria',
                 //     description: ''
                 // }

                  //   .state('app.admin.auditorias.create', {
                // url: '/create',
                // subModule: 'app.admin.auditoria.users',
                 // controllerAs: '$ctrl',
                 // template: '<auditoria-create></auditoria-create>',
                 // data:{
                 //     show: true
                 // },
                 // ncyBreadcrumb: {
                 //     label: 'Crear Auditoria',
                 //     description: ''
                 // }
        //     })
        //     .state('app.admin.auditoria.update', {
                 // url: '/:id/update',
                 // subModule: 'app.admin.auditoria.users',
                 // subModuleName: 'users',
                 // controller: ['item', '$scope', function (item, $scope) {
                 //     var self = this;
                 //     self.item = item;
                 // }],
                 // controllerAs: '$ctrl',
                 // template: '<auditoria-update items="$ctrl.item"></auditoria-update>',
                 // data:{
                 //     show: true
                 // },
                 // ncyBreadcrumb: {
                 //     label: 'Modificar Auditoria',
                 //     description: ''
                 // },
                 // resolve: {
                 //     item: ['$q', '$http', 'API_URL_ADMIN', '$stateParams', function ($q, $http, API_URL_ADMIN, $stateParams) {

                 //         var audId = $stateParams.id;

                 //         return $q(function (resolve, reject) {

                 //             $http({
                 //                 url: API_URL_ADMIN + '/auditoria/' + audId,
                 //                 method: 'GET'
                 //             })
                 //                 .then(function (promise) {
                 //                     resolve(promise.data);
                 //                 }, function (reason) {
                 //                     reject(reason);
                 //                 });
                 //         });

                 //     }]

                 // }
         //    });

    

}());
