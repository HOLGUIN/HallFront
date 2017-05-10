(function () {
    'use strict';

    angular
        .module('app.admin.companies')
        .controller('CompaniesCreateController', CompaniesCreateController);

    CompaniesCreateController.$inject = ['$state', 'companiesFactory', 'profilesFactory', '$scope'];

    function CompaniesCreateController($state, companiesFactory, profilesFactory, $scope) {

        var self = this;
        self.company = {};
        self.action = action;
        self.cancel = cancel;
        activate();

        function activate() {

            profilesFactory.getProfiles().then(function (response) {
                self.profiles = response;
            }, handleError);

        }

        function action() {

            if ($scope.companiesForm.$valid) {
                create();
            }

            function create() {
                companiesFactory.createCompany(self.company).then(function (response) {
                    $state.go('^', {}, {reload: true});
                });
            }

        }

        function cancel() {
            $state.go('^', {}, {reload: true});
        }

        function handleError(error) {
            console.log('--- CompaniesCreateController error ---');
            console.log(error);
        }

    }

}());