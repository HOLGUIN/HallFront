(function () {
    'use strict';

    angular.module('app.config', []).config(config);

    function config($httpProvider, $mdThemingProvider, $translateProvider, $windowProvider, AnalyticsProvider) {

        //Configuracion de google Analytics
        // Set a single account with all properties defined
        // Universal Analytics only
        AnalyticsProvider.setAccount({
            tracker: 'UA-112315764-1',
            name: "Hallearn",
            fields: {
                cookieDomain: 'www.hallearn.com',
                cookieName: 'hallearn',
                cookieExpires: 20000
                // See: [Analytics Field Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference) for a list of all fields.
            },
            displayFeatures: true,
            enhancedLinkAttribution: true,
            select: function (args) {
                // This function is used to qualify or disqualify an account object to be run with commands.
                // If the function does not exist, is not a function, or returns true then the account object will qualify.
                // If the function exists and returns false then the account object will be disqualified.
                // The 'args' parameter is the set of arguments (which contains the command name) that will be sent to Universal Analytics.
                return true;
            },
            set: {
                forceSSL: true
                // This is any set of `set` commands to make for the account immediately after the `create` command for the account.
                // The property key is the command and the property value is passed in as the argument, _e.g._, `ga('set', 'forceSSL', true)`.
                // Order of commands is not guaranteed as it is dependent on the implementation of the `for (property in object)` iterator.
            },
            trackEvent: true,
            trackEcommerce: true
        });

        // Set hybrid mobile application support
        AnalyticsProvider.setHybridMobileSupport(true);

        $mdThemingProvider.theme('dark-grey').backgroundPalette('blue-grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('deep-orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
        $mdThemingProvider.theme('dark-lime').backgroundPalette('lime').dark();
        $mdThemingProvider.theme('dark-teal').backgroundPalette('teal').dark();
        $mdThemingProvider.theme('dark-amber').backgroundPalette('amber').dark();
        $mdThemingProvider.theme('dark-brown').backgroundPalette('brown').dark();
        $mdThemingProvider.theme('dark-indigo').backgroundPalette('indigo').dark();
        $mdThemingProvider.theme('dark-pink').backgroundPalette('pink').dark();


        //Esta es la configuracion necesaria para la plataforma multilenguaje
        $translateProvider.fallbackLanguage('en');
        $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
            'en_*': 'en',
            'es_*': 'es'
        });

        //Traduccion en ingles
        $translateProvider.translations('en', {

            LNG_INICIAR_CLASE: "Start Class",
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
            LNG_CORREOINV: "The mail is invalid",
            LNG_DESCTEMA: "Theme Description",
            LNG_NOMBRES: "Names",
            LNG_APELLIDOS: "Surnames",
            LNG_EDAD: "Age",
            LNG_CELULAR: "Cell Phone",
            LNG_TELEFONO: "Phone",
            LNG_CORREO: "Email",
            LNG_PAIS: "Country",
            LNG_PAISES: "Countrys",
            LNG_DEPART: "Department",
            LNG_DEPARTS: "Departments",
            LNG_CIUDAD: "City",
            LNG_CIUDADES: "Citys",
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
            LNG_MSJ_7: "Start time must be less than the final",
            LNG_MSJ_8: "A department for this country already exists",
            LNG_MSJ_9: "This city already exists for this department",
            LNG_BORRAR: "Do you want to delete this record?",
            LNG_BORRARSUC: "Successfully deleted",
            LNG_MATERIAS: "Subjects",
            LNG_MATERIA: "Subject",
            LNG_TEMAS: "Themes",
            LNG_TEMA: "Theme",
            LNG_FECHA: "Date",
            LNG_HI: "Start Time",
            LNG_HF: "End Time",
            LNG_TH: "Total Hours",
            LNG_TT: "Total",
            LNG_CODIGO: "Code",
            LNG_PRECIO: "Price",
            LNG_PRECHORA: "Price Time",
            LNG_ALUMNO: "Student",
            LNG_ADMIN: "Administrator",
            LNG_CLASES_MENU: "my classes",
            LNG_USUARIOS_MENU: "Users",
            LNG_ASIGN_MENU: "Subjects",
            LNG_PROGTEMA_MENU: "Schedule Theme",
            LNG_UBICACION_MENU: "Location",
            LGN_CONFIG_MENU: "Configuration",
            LNG_HORA: "Hour",
            LNG_TOMAR: "Take",
            LNG_ENTRE: "Between",
            LNG_SALIR: "Exit",
            LNG_CAMBCONTRASENA: "Change Password",
            LNG_EDADMIN: "Minimum Age",
            LNG_REPETIR: "Repeat",
            LNG_PROGTEMA: "Schedule Theme",
            BUTTON_LANG_EN: "English",
            BUTTON_LANG_ES: "Spanish",
            LNG_DISP_CLASS: "Class Availability",
            LNG_HORAS_OCP: "Busy Hours",
            LNG_HORAS_DSP: "Hours Available",
            LNG_MSJ_PC: "Select the date and the hours you want to take",
            LNG_MSJ_PCERR: "This date does not have available hours",
            LNG_CERRAR: "Close",
            LNG_CONFIRM: "Confirm",
            LNG_MSJCONFIRM:"The class was created successfully",
            LNG_CLASEPROG: "Scheduled"
        });

        //Traduccion en español
        $translateProvider.translations('es', {

            LNG_INICIAR_CLASE: "Iniciar Clase",
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
            LNG_CORREOINV: "El correo es invalido",
            LNG_DESCTEMA: "Descripción del Tema",
            LNG_NOMBRES: "Nombres",
            LNG_APELLIDOS: "Apellidos",
            LNG_EDAD: "Edad",
            LNG_CELULAR: "Celular",
            LNG_TELEFONO: "Telefono",
            LNG_CORREO: "Correo",
            LNG_PAIS: "Pais",
            LNG_PAISES: "Paises",
            LNG_DEPART: "Departamento",
            LNG_DEPARTS: "Departamentos",
            LNG_CIUDAD: "Ciudad",
            LNG_CIUDADES: "Ciudades",
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
            LNG_MSJ_7: "La hora inicial debe ser menor a la final",
            LNG_MSJ_8: "Ya existe un departamento para este pais",
            LNG_MSJ_9: "Ya existe esta ciudad para este deparatamento",
            LNG_BORRAR: "¿Desea eliminar este registro?",
            LNG_BORRARSUC: "Eliminado exitosamente",
            LNG_MATERIAS: "Materias",
            LNG_MATERIA: "Materia",
            LNG_TEMAS: "Temas",
            LNG_TEMA: "Tema",
            LNG_FECHA: "Fecha",
            LNG_HI: "Hora Inicio",
            LNG_HF: "Hora Final",
            LNG_TH: "Total Horas",
            LNG_TT: "Total",
            LNG_CODIGO: "Codigo",
            LNG_PRECIO: "Precio",
            LNG_PRECHORA: "Precio Hora",
            LNG_ALUMNO: "Alumno",
            LNG_ADMIN: "Administrador",
            LNG_CLASES_MENU: "Mis Clases",
            LNG_USUARIOS_MENU: "Usuarios",
            LNG_ASIGN_MENU: "Asignaturas",
            LNG_PROGTEMA_MENU: "Programar Temas",
            LNG_UBICACION_MENU: "Ubicación",
            LGN_CONFIG_MENU: "Configuración",
            LNG_HORA: "Hora",
            LNG_TOMAR: "Tomar",
            LNG_ENTRE: "Entre",
            LNG_SALIR: "Salir",
            LNG_CAMBCONTRASENA: "Cambiar Contraseña",
            LNG_EDADMIN: "Edad Minima",
            LNG_REPETIR: "Repetir",
            LNG_PROGTEMA: "Programar Tema",
            BUTTON_LANG_EN: "Inglés",
            BUTTON_LANG_ES: "Español",
            LNG_DISP_CLASS: "Disponibilidad de Clases",
            LNG_HORAS_OCP: "Horas Ocupadas",
            LNG_HORAS_DSP: "Horas Disponibles",
            LNG_MSJ_PC: "Selecciona la fecha y las horas que quieres tomar",
            LNG_MSJ_PCERR: "Esta fecha no tiene horas disponibles",
            LNG_CERRAR: "Cerrar",
            LNG_CONFIRM: "Confirmar",
            LNG_MSJCONFIRM:"La clase se creo exitosamente",
            LNG_CLASEPROG: "Programadas"
        });

        $translateProvider.useSanitizeValueStrategy('escape');
        var idioma = $windowProvider.$get().localStorage.idioma;
        $translateProvider.preferredLanguage(idioma != null ? idioma : 'es');

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