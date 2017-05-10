(function () {
    'use strict';

    angular
        .module('app.admin.companies')
        .controller('CompaniesController', CompaniesController);

    CompaniesController.$inject = ['companiesFactory', '$state','$scope'];

    function CompaniesController(companiesFactory, $state, $scope) {

        var self = this;
        self.companies = [];
        self.companies = self.items;

        [].forEach.call(self.companies, function (data, index) {
            self.companies[index].id = data.empresaid;
        });

        self.headerTable = {
            'empresaid': 'Código',
            'nit': 'Nit',
            'descripcion': 'Descripción'
        };

        self.columns = Object.keys(self.headerTable);

        function action() {

            if ($scope.companiesForm.$valid) {
                alert('our form is amazing');
            }
        }

    }

}());