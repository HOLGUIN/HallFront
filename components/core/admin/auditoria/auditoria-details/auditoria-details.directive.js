(function () {
   'use strict';

   angular
      .module('app.admin.auditoria')
      .directive('auditoriaDetails', auditoriaDetails);

   auditoriaDetails.$inject = [];

   function auditoriaDetails() {

      return {
         scope: {},
         controller: 'AuditoriaDetailsController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/auditoria/auditoria-details/auditoria-details.template.html'
      };

   }

}());