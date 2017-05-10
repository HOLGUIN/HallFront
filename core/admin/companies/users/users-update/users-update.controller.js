(function () {
    'use strict';

    angular
        .module('app.admin.companies.users')
        .controller('UsersUpdateController', UsersUpdateController);

    UsersUpdateController.$inject = ['usersFactory', '$state', '$stateParams', 'profilesFactory', 'companiesFactory', '$uibModal', '$log'];

    function UsersUpdateController(usersFactory, $state, $stateParams, profilesFactory, companiesFactory, $uibModal, $log) {

        var self = this,
            userId = $stateParams.id,
            idTemplateDoc, idTemplateTemp;

        self.user = {};
        /*--- functions ---*/
        self.action = action;
        self.cancel = cancel;
        self.modalTemplates = modalTemplates;
        self.deleteDocument = deleteDocument;

        self.user = self.items;
        self.plantillaUsuario = self.user.plantillaUsuario;
        self.documentsTemplates = [];

        activate();

        function activate() {


            profilesFactory.getProfiles().then(function (response) {

                self.profiles = response;

                var temp = [].filter.call(self.profiles, function (data) {
                    return data.perfilid === self.user.perfilid;
                });

                self.perfil = temp[0];

            }, handleError);


            companiesFactory.getDocument(self.user.empresaid).then(function (response) {

                [].filter.call(self.plantillaUsuario, function (dataDoc, $indexDoc) {

                    idTemplateDoc = dataDoc.plantillaid;

                    [].filter.call(response, function (dataTemp, $indexTemp) {

                        idTemplateTemp = dataTemp.plantillaid;

                        if (idTemplateDoc === idTemplateTemp) {
                            self.plantillaUsuario[$indexDoc].descripcion = dataTemp.descripcion;
                            response.splice($indexTemp, 1);
                        }

                    });

                });

                self.documentsTemplates.data = response;
                self.documentsTemplates.data.valor = false;
                self.documentsTemplates.module = 'users';
                self.documentsTemplates.userId = userId;
                self.documentsTemplateUser = self.plantillaUsuario;
            });

        }

        function modalTemplates() {

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/core/admin/companies/companiesTemplates-modal.template.html',
                controller: 'ModalCompaniesTemplatesController',
                controllerAs: '$ctrl',
                windowClass: 'u-modalPosition',
                size: 'lg',
                resolve: {
                    items: function () {
                        return self.documentsTemplates;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                $state.go('app.admin.companies.users.update', {id: userId}, {reload: true});
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }


        function action() {

            update();

            self.user.perfilid = self.perfil.perfilid;

            function update() {
                usersFactory.updateUser(userId, self.user).then(function (response) {
                    $state.go('app.admin.companies.update', {id: self.user.empresaid}, {reload: true});
                });
            }
        }

        function cancel() {

            $state.go('app.admin.companies.update', {id: self.user.empresaid}, {reload: true});

        }

        function handleError(error) {
            console.log('--- UsersUpdateController error ---');
            console.log(error);
        }

        function deleteDocument(plantillausuarioid) {

            companiesFactory.deleteUsersTemplates(plantillausuarioid).then(function (response) {
                activate();
            });

        }

    }

}());