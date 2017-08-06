(function () {
   'use strict';

   angular
      .module('app.admin.companies.users')
      .directive('usersForm', usersForm);

   function usersForm() {
      return {
         scope: true,
         templateUrl: 'components/core/admin/companies/users/users.form.html'
      };
   }
}());