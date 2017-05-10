(function() {
   'use strict';

   angular.module('crm').controller('UpdatePasswordController', UpdatePasswordController);

   UpdatePasswordController.$inject = ['LoginFactory', 'AuthTokenFactory'];

   function UpdatePasswordController(LoginFactory, AuthTokenFactory) {

      var self = this;

      self.updatePassword = updatePassword;

      function updatePassword() {

         var newPassword = self.newPassword;

         LoginFactory.updatePassword(newPassword).then(success, handleError);

         function success(response) {
           // console.log('--- update password ---');
           // console.log(response.data);

            AuthTokenFactory.setToken();

         }

         function handleError(response) {
            self.handleError = response.data.error;
            return self.handleError
         }

      }

   }

}());