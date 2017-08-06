
(function () {
    'use strict';

    angular
        .module('app.asignatura')
        .controller('AsignaturaController', AsignaturaController);

    AsignaturaController.$inject = ['$stateParams', '$state'];

    function AsignaturaController($stateParams, $state) {

        var self = this;

        console.log('AsignaturaController+++++');
        console.log(self);
        
    }

}());