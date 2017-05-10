(function () {
    'use strict';

    angular
        .module('app.admin.profiles')
        .controller('ProfilesUpdateController', ProfilesUpdateController);

    ProfilesUpdateController.$inject = ['profilesFactory', '$state', '$stateParams'];

    function ProfilesUpdateController(profilesFactory, $state, $stateParams) {

        var self = this,
            profileId = $stateParams.id;

        self.profile = {};
        /*--- functions ---*/
        self.action = action;
        self.updatePermissionProfile = updatePermissionProfile;
        self.updateAllStatesPermission = updateAllStatesPermission;
        self.states = false;
        self.cancel = cancel;

        activate();

        function activate() {

            profilesFactory.getProfile(profileId).then(function (response) {
                self.profile = response;
            }, handleError);


            profilesFactory.getPermissionProfile(profileId).then(function (response) {
                self.permissionsProfiles = response;
            });


        }

        function action() {

            update();

            function update() {

                profilesFactory.updateProfile(profileId, self.profile).then(function (response) {
                    $state.go('^', {}, {reload: true});
                });

            }

        }

        function updatePermissionProfile(permission) {

            profilesFactory.updatePermissionProfile(permission.perfilpermisoid, permission).then(function (response) {
            });

        }

        function updateAllStatesPermission() {

            [].forEach.call(self.permissionsProfiles, function (data, index) {

                self.permissionsProfiles[index].valor = self.states;

            });

        }

        function handleError(error) {
            console.log('--- ProfilesUpdateController error ---');
            console.log(error);
        }

        function cancel() {
            $state.go('^', {}, {reload: true});
        }

    }

}());