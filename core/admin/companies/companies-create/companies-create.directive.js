(function () {
   'use strict';

   angular
      .module('app.admin.companies')
      .directive('companiesCreate', companiesCreate);

   companiesCreate.$inject = [];

   function companiesCreate() {

      return {
         scope: {},
         controller: 'CompaniesCreateController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/companies/companies-create/companies-create.template.html'
      };

   }

}());