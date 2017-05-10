(function () {
    'use strict';

    angular.module('app.header', []).directive('appHeader', appHeader);

    appHeader.$inject = ['$state' ];
   

    function appHeader($state) {

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




        function AppHeaderController($scope, $window, $state, $uibModal, appHeaderFactory) {

            var self = this;

            self.showConfig = false;
            self.showTemplate = false;
            self.showAssistant = false;
            self.showMonitor = false;  

            self.showConfig1 = false;
            self.showTemplate1 = false;
            self.showAssistant1 = false;
            self.showMonitor1 = false;  

            self.posicion = 1;

            var currentProfile = $window.localStorage.perfilid;

        

            self.logout = logout;
         
            
            var usuario = JSON.parse($window.localStorage.usuario) ; 
            self.currentUser = usuario.username;
            self.currentAdministrador = usuario.administrador;
            self.currentProfesor = usuario.profesor;
            self.currentAlumno = usuario.alumno;
            self.changePassword = changePassword;
            
            console.log(self.currentAdministrador);


activate();
        
function activate()
{
    if(self.currentAdministrador == true)
    {
         self.showAdministrador = true;
    }
    if(self.currentProfesor == true)
    {
          self.showProfesor = true;
    }
    if(self.currentAlumno==true) 
    {
         self.showAlumno = true;
    }
}
       
 menu();
 submenu_alumno();
 submenu_profesor();
 submenu_admin();


 

//funcion para que aparesca o desaparesca el menu 
function menu(){
    var contador = 1;
	$('.open_list').click(function(){
		if(contador == 1){
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


function submenu_alumno()
{
    $('.submenu_alumno').click(function(){
         $(this).children('.children_alumno').slideToggle();
    });
}


function submenu_profesor()
{
    $('.submenu_profesor').click(function(){
         $(this).children('.children_profesor').slideToggle();
    });
}


function submenu_admin()
{
    $('.submenu_admin').click(function(){
         $(this).children('.children_admin').slideToggle();
    });
}



        function logout() {

                $state.go('login');
            };

            function changePassword() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/widgets/app-header/app-modal-password.html',
                    controller: ModalController,
                    controllerAs: '$ctrl',
                    windowClass: 'u-modalPosition',
                    size: 'lg',
                    resolve: {
                        items: function () {
                            return 'holaaa';
                        }
                    }
                });

                modalInstance.result.then(function (data) {

                }, function () {
                    //console.log('cerro modal');
                });
            }

        };
    }

    function ModalController(appHeaderFactory,$window,$uibModalInstance) {
        var self = this;

        self.nameModule = 'Cambiar Contraseña';
        self.confirmChange = confirmChange;
        self.cancel = cancel;
        //$scope.nameModule = 'Cambiar Contraseña';
        //console.log('entro modal');

        function confirmChange() {
            var changes = {
                usuarioid: $window.localStorage.usuarioid,
                contrasena_actual: self.passwordactual,
                contrasena_nueva: self.passwordnew,
                contrasena_nueva2: self.passwordnew2
            };

            appHeaderFactory.updatePassword($window.localStorage.usuarioid, changes).then(function (response) {
                $uibModalInstance.close('');
            },function(reason){
                //console.log(reason);
                self.error = reason.data;
            });
        }

        function cancel()
        {
           $uibModalInstance.close(''); 
        }

    };






//Modal logout 

    self.showToast2 = showToast2;

    function showToast2()
     {
                  var toast = $mdToast.simple()
                     .textContent('Hello World!')
                     .action('OK')
                     .highlightAction(false);                     
                  $mdToast.show(toast).then(function(response) {
                     if ( response == 'ok' ) {
                        alert('You clicked \'OK\'.');
                     }
                  });			   
    }

} ());