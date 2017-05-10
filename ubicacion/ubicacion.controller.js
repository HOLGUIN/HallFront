
(function () {
    'use strict';

    angular
        .module('app.ubicacion')
        .controller('UbicacionController', UbicacionController);

    UbicacionController.$inject = ['$stateParams', '$state'];

    function UbicacionController($stateParams, $state) {

        var self = this;

        console.log('UbicacionController+++++');
        console.log(self);
        
    }

}());