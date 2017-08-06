(function () {
    'use strict';

    angular
        .module('app.admin.profiles')
        .controller('ProfilesController', ProfilesController);

    ProfilesController.$inject = ['profilesFactory'];

    function ProfilesController(profilesFactory) {

        var self = this;

        self.profiles = [];

        self.profiles = self.items;
        console.log('self.profiles******');
        console.log(self.profiles);

        [].forEach.call(self.profiles, function (data, index) {

            self.profiles[index].id = data.perfilid;

        });

        self.headerTable = {
            'nombre': 'Nombre del perfil',
            'descripcion': 'Descripción'
        };

        self.columns = Object.keys(self.headerTable);
    }

}());