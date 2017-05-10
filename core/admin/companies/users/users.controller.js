(function () {
   'use strict';

   angular
      .module('app.admin.companies.users')
      .controller('UsersController', UsersController);

   UsersController.$inject = ['usersFactory', '$state'];

   function UsersController(usersFactory, $state) {
      var self = this;
   }

}());