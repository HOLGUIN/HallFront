(function () {
    'use strict';

    angular
        .module('app.translate')
        .controller('TranlateController', TranlateController);

    TranlateController.$inject = ['$stateParams', '$state', '$translate'];

    function TranlateController($stateParams, $state, $translate) {
        var self = this;

        self.changeLanguage = function(key)
        {
          $translate.use(key);
        }
    
    }
}());