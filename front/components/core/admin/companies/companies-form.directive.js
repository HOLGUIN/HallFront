(function () {
   'use strict';

   angular
      .module('app.admin.companies')
      .directive('companiesForm', companiesForm);

   function companiesForm() {

      return {
         scope: true,
         templateUrl: 'components/core/admin/companies/companies.form.html'
      };
   }

}());