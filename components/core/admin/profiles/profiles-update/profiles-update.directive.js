(function () {
   'use strict';

   angular
      .module('app.admin.profiles')
      .directive('profilesUpdate', profilesUpdate);

   profilesUpdate.$inject = [];

   function profilesUpdate() {

      return {
         scope: {},
         controller: 'ProfilesUpdateController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/profiles/profiles-update/profiles-update.template.html'
      };

   }

}());