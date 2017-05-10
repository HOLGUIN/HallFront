(function() {
   'use strict';

   angular.module('crm').controller('RecoveryPasswordController', RecoveryPasswordController);

   RecoveryPasswordController.$inject = ['LoginFactory', '$location', '$stateParams', 'AuthTokenFactory'];

   function RecoveryPasswordController(LoginFactory, $location, $stateParams, AuthTokenFactory) {

      var self = this;

      var tokenUrl = $stateParams.token;

      if(tokenUrl) {
         LoginFactory.sendUrlToken(tokenUrl).then(success, handleError);
      }

      function success(response) {
         AuthTokenFactory.setToken(tokenUrl);
         if(response.data.status === "valid" && response.status === 200) {
            $location.path('/crm/login');
         }
      }

      function handleError(response) {
        // console.log('--- handleError ---');
        // console.log(response);
         self.handleError = response.data.status;
      }

   }

}());