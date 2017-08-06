(function () {
   'use strict';

   angular
      .module('app.admin')
      .factory('adminFactory', adminFactory);

   adminFactory.$inject = ['$q'];

   function adminFactory($q) {

      return {
         getConfig: getConfig
      };

      function getConfig() {

      }
   }

}());