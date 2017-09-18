(function () {
    'use strict';

    angular.module('app.config', []).config(config);

    function config($httpProvider, $mdThemingProvider, $translateProvider) {

        //Esta es la configuracion necesaria para la plataforma multilenguaje
        $translateProvider.fallbackLanguage('en');
        $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
            'en_*': 'en',
            'es_*': 'es'
        });

        //Traduccion en ingles
        $translateProvider.translations('en', {

            LNG_INICIAR_SESION: "LOG IN",
            LNG_REGISTRAR: "SIGN IN ",
            LNG_USUARIO_LOG: "User",
            LNG_PASSWORD_LOG: "Password",
            LNG_USUARIO_LOG_ERROR: "User is required",
            LNG_PASSWORD_LOG_ERROR: "Password is required",
            LNG_PROGRAMA_CLASE: "PROGRAM YOUR CLASS",
            LNG_INICIO: "Home",
            LNG_DATOS: "My Data",
            LNG_EDITINFO: "Edit Information",
            LNG_SAVEINFO: "Save Information",
            LNG_NOMBREQ: "Name is required",
            LNG_APELLREQ: "Surnames are required",
            LNG_EDADREQ: "Age is required",
            LNG_CORREOREQ: "Email is required",

            LNG_NOMBRES: "Names",
            LNG_APELLIDOS: "Surnames",
            LNG_EDAD: "Age",
            LNG_CELULAR: "Cell Phone",
            LNG_TELEFONO: "Phone",
            LNG_CORREO: "Email",
            LNG_PAIS: "Country",
            LNG_DEPART: "Department",
            LNG_CIUDAD: "City",
            LNG_USERNAME: "Username",
            LNG_ACTIVO: "Active",

            LGN_PROFESOR: "Teacher",
            LGN_ALUMNO: "Student",
            LGN_ACCIONES: "Actions",

            LGN_CONFIRM: "Confirm",
            LGN_GUARDAR: "Save",
            LGN_CANCEL: "Cancel",
            LGN_DESCRIP: "Description",

            LNG_ADMIN_TBL: "Admin",
            LNG_CREAR: "Create",
            LNG_EDITAR: "Edit",
            LNG_ACEPTAR: "Ok",
            LNG_EDITSUCS: "Was successfully edited",
            LNG_CREATESUCS: "Was created successfully",

            LNG_ERROR: "An error occurred in the process",
            LNG_MSJ_1: "Passwords do not match",
            LNG_MSJ_2: "Age is not valid",
            LNG_MSJ_3: "Username already exists",
            LNG_MSJ_4: "You must select a role for the user",
            LNG_MSJ_5: "An item with that name already exists",
            LNG_MSJ_6: "You must enter the fields *",

            LNG_BORRAR: "Do you want to delete this record?",
            LNG_BORRARSUC: "Successfully deleted",

            LNG_MATERIAS: "Subjects",
            LNG_MATERIA: "Subject",
            LNG_TEMAS: "Themes",
            LNG_TEMA: "Theme",

            LNG_PRECIO:"Price",
            LNG_PRECHORA:"Price Time",

            LNG_ALUMNO: "Student",
            LNG_ADMIN: "Administrator",
            LNG_CLASES_MENU: "lessons",
            LNG_TCLASE_MENU: "Take Class",
            LNG_USUARIOS_MENU: "Users",
            LNG_ASIGN_MENU: "Subjects",
            LNG_PROGTEMA_MENU: "Schedule Theme",
            LNG_UBICACION_MENU: "Location",
            LGN_CONFIG_MENU: "Configuration",
            BUTTON_LANG_EN: "English",
            BUTTON_LANG_ES: "Spanish"
        });

        //Traduccion en español
        $translateProvider.translations('es', {

            LNG_INICIAR_SESION: "INICIAR SESIÒN",
            LNG_REGISTRAR: "REGISTRARSE",
            LNG_USUARIO_LOG: "Usuario",
            LNG_PASSWORD_LOG: "Contraseña",
            LNG_USUARIO_LOG_ERROR: "El usuario es requerido",
            LNG_PASSWORD_LOG_ERROR: "La contraseña es requerida",
            LNG_PROGRAMA_CLASE: "PROGRAMA TU CLASE",
            LNG_INICIO: "Inicio",
            LNG_DATOS: "Mis Datos",
            LNG_EDITINFO: "Editar Información",
            LNG_SAVEINFO: "Guardar Información",
            LNG_NOMBREQ: "El nombre es requerido",
            LNG_APELLREQ: "Los apellidos son requeridos",
            LNG_EDADREQ: "La edad es requerida",
            LNG_CORREOREQ: "El correo es requerido",

            LNG_NOMBRES: "Nombres",
            LNG_APELLIDOS: "Apellidos",
            LNG_EDAD: "Edad",
            LNG_CELULAR: "Celular",
            LNG_TELEFONO: "Telefono",
            LNG_CORREO: "Correo",
            LNG_PAIS: "Pais",
            LNG_DEPART: "Departamento",
            LNG_CIUDAD: "Ciudad",
            LNG_USERNAME: "Username",
            LNG_ACTIVO: "Activo",

            LGN_PROFESOR: "Profesor",
            LGN_ALUMNO: "Alumno",
            LGN_ACCIONES: "Acciones",

            LGN_CONFIRM: "Confirmar",
            LGN_GUARDAR: "Guardar",
            LGN_CANCEL: "Cancelar",
            LGN_DESCRIP: "Descripción",

            LNG_ADMIN_TBL: "Admin",
            LNG_CREAR: "Crear",
            LNG_EDITAR: "Editar",
            LNG_ACEPTAR: "Aceptar",
            LNG_EDITSUCS: "Se editó con exíto",
            LNG_CREATESUCS: "Se creo con exíto",

            LNG_ERROR: "Ocurrio un error en el proceso",
            LNG_MSJ_1: "Las contraseñas no coinciden",
            LNG_MSJ_2: "La edad no es valida",
            LNG_MSJ_3: "El username ya existe",
            LNG_MSJ_4: "Debe seleccionar un rol para el usuario",
            LNG_MSJ_5: "Ya existe un item con ese nombre",
            LNG_MSJ_6: "Debe ingresar los campos *",


            LNG_BORRAR: "Do you want to delete this record?",
            LNG_BORRARSUC: "Successfully deleted",

            LNG_MATERIAS: "Materias",
            LNG_MATERIA: "Materia",
            LNG_TEMAS: "Temas",
            LNG_TEMA: "Tema",

            LNG_PRECIO:"Precio",
            LNG_PRECHORA:"Precio Hora",

            LNG_ALUMNO: "Alumno",
            LNG_ADMIN: "Administrador",
            LNG_CLASES_MENU: "Clases",
            LNG_TCLASE_MENU: "Tomar Clase",
            LNG_USUARIOS_MENU: "Usuarios",
            LNG_ASIGN_MENU: "Asignaturas",
            LNG_PROGTEMA_MENU: "Programar Temas",
            LNG_UBICACION_MENU: "Ubicación",
            LGN_CONFIG_MENU: "Configuración",
            BUTTON_LANG_EN: "Inglés",
            BUTTON_LANG_ES: "Español"
        });

        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('en');

        //Configuracion para angular material
        $mdThemingProvider.theme('indigo')
            .primaryPalette('indigo')
            .accentPalette('indigo')
            .warnPalette('red');

        $mdThemingProvider.theme('green')
            .primaryPalette('green')
            .accentPalette('green')
            .warnPalette('red');

        // This is the absolutely vital part, without this, changes will not cascade down through the DOM.
        $mdThemingProvider.alwaysWatchTheme(true);

        // This is the absolutely vital part, without this, changes will not cascade down through the DOM.
        $httpProvider.defaults.timeout = 5000;
        $httpProvider.interceptors.push('AuthInterceptor');
    }

}());