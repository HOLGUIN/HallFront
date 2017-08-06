 (function () {
    'use strict';

    angular
       .module('app.admin.auditoria')
       .directive('auditoriaForm', auditoriaForm);

    function auditoriaForm() {

      return {
          scope: true,
          templateUrl: 'components/core/admin/auditoria/auditoria.form.html'
      };
    }

 }());