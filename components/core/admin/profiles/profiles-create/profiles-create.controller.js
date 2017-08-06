(function () {
    'use strict';

    angular
        .module('app.admin.profiles')
        .controller('ProfilesCreateController', ProfilesCreateController);

    ProfilesCreateController.$inject = ['profilesFactory', '$state'];

    function ProfilesCreateController(profilesFactory, $state) {

        var self = this;
        self.profile = {};
        self.action = action;
        self.cancel = cancel;

        function action() {

            create();

            function create() {

                profilesFactory.createProfile(self.profile).then(function (response) {
                    $state.go('^', {}, {reload: true});
                });

            }

        }

        function cancel() {

            $state.go('^', {}, {reload: true});

        }
        function handleError(error) {
            console.log('--- ProfilesCreateController error ---');
            console.log(error);
        }

    }

}());