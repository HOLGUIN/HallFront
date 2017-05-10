(function () {
   'use strict';

   angular
      .module('app.admin.companies')
      .directive('companies', companies);

   companies.$inject = [];

   function companies() {

      return {
         scope: {
            items:'=items'
         },
         controller: 'CompaniesController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/companies/companies.template.html'
      };

   }

}());