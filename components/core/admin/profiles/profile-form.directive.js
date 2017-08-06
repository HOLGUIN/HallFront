(function () {
   'use strict';

   angular
      .module('app.admin.profiles')
      .directive('profilesForm', profilesForm);

   function profilesForm() {

      return {
         scope: true,
         templateUrl: 'components/core/admin/profiles/profiles.form.html'
      };
   }

}());