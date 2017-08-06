(function () {
   'use strict';

   angular
      .module('app.admin.companies.users')
      .directive('users', users);

   users.$inject = [];

   function users() {

      return {
         scope: {
            items:'=items'
         },
         controller: 'UsersController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/companies/users/users.template.html'
      };

   }

}());