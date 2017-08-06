(function () {
   'use strict';

   angular
      .module('app.admin.profiles')
      .directive('profiles', profiles);

   profiles.$inject = [];

   function profiles() {

      return {
         scope: {
            items:'=items'
         },
         controller: 'ProfilesController',
         controllerAs: '$ctrl',
         bindToController: true,
         templateUrl: 'components/core/admin/profiles/profiles.template.html'
      };

   }

}());