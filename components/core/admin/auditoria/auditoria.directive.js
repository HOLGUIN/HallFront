 (function () {
   'use strict';

   angular
      .module('app.admin.auditoria')
      .directive('auditoria', auditoria);

   auditoria.$inject = [];

   function auditoria() {

      return {
         scope: {
            items:'=items'
         },
         controller: 'AuditoriaController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/auditoria/auditoria.template.html'
      };

   }

}());