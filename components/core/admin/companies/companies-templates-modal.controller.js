(function () {
    'use strict';

    angular
        .module('app.admin.companies')
        .controller('ModalCompaniesTemplatesController', ModalCompaniesTemplatesController);

    ModalCompaniesTemplatesController.$inject = ['$uibModalInstance', 'items', 'templatesFactory', 'companiesFactory'];

    function ModalCompaniesTemplatesController($uibModalInstance, items, templatesFactory, companiesFactory) {


        var self = this,
            dataSelect = [],
            companyId = items.companyId,
            userId = items.userId,
            data;

        self.addTemplate = addTemplate;
        self.states = false;
        self.addAllTemplates = addAllTemplates;
        self.saveDocument = saveDocument;
        self.cancel = cancel;
        self.templates = items.data;
        // = items.valor;

        function addAllTemplates() {

            dataSelect = [];

            [].forEach.call(self.templates, function (data, index) {

                if (items.module === 'users') {
                    dataSelect.push({
                        plantillaid: data.plantillaid,
                        empresaid: data.empresaid,
                        usuarioid: userId,
                        usuariocreid: userId
                    });
                } else {
                    dataSelect.push(data.plantillaid);
                }

                self.templates[index].valor = self.states;
            });

            if (!self.states) {
                dataSelect = [];
            }

        }

        function addTemplate(template) {

            if (items.module === 'companies') {
                if (template.valor) {
                    dataSelect.push(template.plantillaid);
                } else {
                    var $index = dataSelect.indexOf(template.plantillaid);
                    dataSelect.splice($index, 1);
                }
            } else if (items.module === 'users') {

                dataSelect.push({
                    plantillaid: template.plantillaid,
                    empresaid: template.empresaid,
                    usuarioid: userId,
                    usuariocreid: userId
                });

            }
        }

        function saveDocument() {

            if (items.module === 'companies') {

                data = {
                    empresaid: companyId,
                    plantillaid: dataSelect
                };

                companiesFactory.addTemplatesDocuments(data).then(function (response) {
                    $uibModalInstance.close();
                });

            } else if (items.module === 'users') {

                companiesFactory.addUsersTemplates(dataSelect).then(function (response) {
                    $uibModalInstance.close();
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }


}());