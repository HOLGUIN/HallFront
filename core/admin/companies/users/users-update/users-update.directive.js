(function () {
    'use strict';

    angular
        .module('app.admin.companies.users')
        .directive('usersUpdate', usersUpdate);

    usersUpdate.$inject = [];

    function usersUpdate() {

        return {
            scope: {
                items: '='
            },
            controller: 'UsersUpdateController',
            controllerAs: '$ctrl',
            bindToController: true,
            templateUrl: 'components/core/admin/companies/users/users-update/users-update.template.html'
        };

    }

}());