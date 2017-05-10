(function () {
    'use strict';

    angular
        .module('app.admin.companies.users')
        .controller('UsersCreateController', UsersCreateController);

    UsersCreateController.$inject = ['$state', 'usersFactory', 'profilesFactory', '$stateParams'];

    function UsersCreateController($state, usersFactory, profilesFactory, $stateParams) {

        /* jshint validthis: true */
        var self = this,
            companyId = $stateParams.id;

        self.user = {};
        self.action = action;
        self.cancel = cancel;
        activate();

        function activate() {

            profilesFactory.getProfiles().then(function (response) {
                self.profiles = response;
            }, handleError);

        }

        function action() {

            self.user.perfilid = self.perfil.perfilid;
            self.user.empresaid = companyId;

            create();

            function create() {

                usersFactory.createUser(self.user).then(function (response) {
                    $state.go('app.admin.companies.update', {id: companyId}, {reload: true});
                });

            }

        }

        function handleError(error) {
            console.log('--- UsersCreateController error ---');
            console.log(error);
        }

        function cancel() {

            $state.go('app.admin.companies.update', {id: companyId}, {reload: true});

        }

    }

}());