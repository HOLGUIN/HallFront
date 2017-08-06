(function () {
   'use strict';

   angular
      .module('app.admin.companies.users')
      .directive('usersCreate', usersCreate);

   usersCreate.$inject = [];

   function usersCreate() {

      return {
         scope: {},
         controller: 'UsersCreateController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/companies/users/users-create/users-create.template.html'
      };

   }

}());