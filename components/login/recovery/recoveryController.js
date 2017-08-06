(function() {
   'use strict';

   angular.module('crm').controller('RecoveryController', RecoveryController);

   RecoveryController.$inject = ['LoginFactory'];

   function RecoveryController(LoginFactory) {

      var self = this;

      self.recovery = recovery;

      function recovery() {
         console.log(self.email);
         var email = self.email;
         LoginFactory.recovery(email).then(function success(response) {
           // console.log('---- recovery ---');
           // console.log(response.data);
            self.message = response.data.status;
         }, handleError);
      }

      function handleError(response) {
         self.error = response.data.status;
      }

   }

}());