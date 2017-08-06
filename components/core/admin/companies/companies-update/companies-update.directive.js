(function () {
   'use strict';

   angular
      .module('app.admin.companies')
      .directive('companiesUpdate', companiesUpdate);

   companiesUpdate.$inject = [];

   function companiesUpdate() {

      return {
         scope: {
            items: '=items'
         },
         controller: 'CompaniesUpdateController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/companies/companies-update/companies-update.template.html'
      };

   }

}());