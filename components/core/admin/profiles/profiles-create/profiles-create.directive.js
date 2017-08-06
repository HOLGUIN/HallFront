(function () {
   'use strict';

   angular
      .module('app.admin.profiles')
      .directive('profilesCreate', profilesCreate);

   profilesCreate.$inject = [];

   function profilesCreate() {

      return {
         scope: {},
         controller: 'ProfilesCreateController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/profiles/profiles-create/profiles-create.template.html'
      };

   }

}());