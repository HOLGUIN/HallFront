(function () {
    'use strict';

    angular.module('app.header', []).directive('appHeader', appHeader);

    appHeader.$inject = ['$state', "$translate"];


    function appHeader($state, $scope) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                title: '='
            },
            controller: AppHeaderController,
            controllerAs: '$ctrl',
            bindToController: true,
            templateUrl: 'components/widgets/app-header/app-header.template.html'
        };

        function AppHeaderController($scope, $window, $state, $uibModal, appHeaderFactory, $translate) {

            var self = this;

            var currentProfile = $window.localStorage.perfilid;

            self.logout = logout;

            var usuario = JSON.parse($window.localStorage.usuario);
            self.currentUser = usuario.username;
            self.currentAdministrador = usuario.administrador;
            self.currentProfesor = usuario.profesor;
            self.currentAlumno = usuario.alumno;
            self.changePassword = changePassword;
            self.changeLanguage = changeLanguage
            self.language = $window.localStorage.idioma;

            activate();

            function activate() {
                if (self.currentAdministrador == true) {
                    self.showAdministrador = true;
                }
                if (self.currentProfesor == true) {
                    self.showProfesor = true;
                }
                if (self.currentAlumno == true) {
                    self.showAlumno = true;
                }
            }

            menu();
            menucontent();
            submenu_alumno();
            submenu_profesor();
            submenu_admin();

            //funcion para que aparesca o desaparesca el menu 
            var contador = 1;
            function menu() {

                $('.open_list').click(function () {
                    if (contador == 1) {
                        $('nav').animate({
                            left: '0'
                        });
                        contador = 0;
                    } else {
                        contador = 1;
                        $('nav').animate({
                            left: '-100%'
                        });
                    }
                });
            };


            //Metodo para cambiar el idioma de la aplicación
            function changeLanguage(language) {
                $window.localStorage.setItem('idioma', language)
                self.language = language;
                $translate.use(self.language);
            }

            function menucontent() {
                //  alert();
                $(".margin-body").click(function () {
                    // alert(contador);
                    if (contador == 0) {
                        contador = 1;
                        $('nav').animate({
                            left: '-100%'
                        });
                    }
                });
            }

            function submenu_alumno() {
                $('.submenu_alumno').click(function () {
                    $(this).children('.children_alumno').slideToggle();
                });
            }

            function submenu_profesor() {
                $('.submenu_profesor').click(function () {
                    $(this).children('.children_profesor').slideToggle();
                });
            }

            function submenu_admin() {
                $('.submenu_admin').click(function () {
                    $(this).children('.children_admin').slideToggle();
                });
            }

            function logout() {
                $translate.use(self.language);
                $state.go('login');
            };

            function changePassword() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-modals/ChangePassword.html',
                    controller: ModalController,
                    controllerAs: '$ctrl',
                    windowClass: 'u-modalPosition',
                    size: 'md'
                });
            }

        };
    }

    function ModalController($uibModalInstance) {
        var self = this;

        self.password = null;
        self.password2 = null;
        self.cancel = cancel;

        function cancel() {
            $uibModalInstance.close();
        }

    };



}());