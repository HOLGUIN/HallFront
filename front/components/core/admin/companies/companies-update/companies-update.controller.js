(function () {
    'use strict';

    angular
        .module('app.admin.companies')
        .controller('CompaniesUpdateController', CompaniesUpdateController);

    CompaniesUpdateController.$inject = ['companiesFactory', '$state', '$stateParams', 'templatesFactory', '$uibModal', '$log', '$scope'];

    function CompaniesUpdateController(companiesFactory, $state, $stateParams, templatesFactory, $uibModal, $log, $scope) {

        var self = this,
            companyId = $stateParams.id;

        self.company = {};
        self.users = [];
        self.action = action;
        self.createUser = createUser;
        self.company = self.items;
        self.templates = [];
        self.documents = self.company.documento;
        self.users = self.company.usuario;
        self.cancel = cancel;
        self.modalTemplates = modalTemplates;
        self.readonly = false;
        self.deleteDocument = deleteDocument;

        [].forEach.call(self.users, function (data, index) {
            self.users[index].id = data.usuarioid;
        });

        activate();

        function activate() {
            var idTemplateDoc, idTemplateTemp;
            templatesFactory.getTemplates().then(function (response) {

                [].filter.call(self.documents, function (dataDoc) {

                    idTemplateDoc = dataDoc.plantillaid;

                    [].filter.call(response, function (dataTemp, $indexTemp) {

                        idTemplateTemp = dataTemp.plantillaid;

                        if (idTemplateDoc === idTemplateTemp) {
                            response.splice($indexTemp, 1);
                        }

                    });

                });

                self.templates.data = response;
                self.templates.data.valor = false;
                self.templates.companyId = companyId;
                self.templates.module = 'companies';

            });
        }

        self.headerTable = {
            'username': 'Nombre de Usuario',
            'nombre': 'Nombre',
            'apellido': 'Apellidos',
            'email': 'Correo'
        };

        self.columns = Object.keys(self.headerTable);
        function action() {

            if ($scope.companiesForm.$valid) {
                update();
            }

            function update() {
                companiesFactory.updateCompany(companyId, self.company).then(function (response) {
                    $state.go('^', {}, {reload: true});
                });
            }

        }

        function createUser() {
            $state.go('app.admin.companies.users.create', {id: companyId})
        }

        function cancel() {
            $state.go('^', {reload: true});
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
                        return self.templates;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                $state.go('app.admin.companies.update', {id: companyId}, {reload: true});
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function handleError(error) {
            console.log('--- CompaniesUpdateController error ---');
            console.log(error);
        }

        function deleteDocument(idDocument) {
            companiesFactory.deleteDocument(idDocument).then(function (response) {
                activate();
            });

        }

    }

}());