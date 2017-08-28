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
            LNG_ALUMNO: "Student",
            LNG_ADMIN: "Administrator",
            LNG_CLASES_MENU: "lessons",
            LNG_TCLASE_MENU:"Take Class",
            LNG_USUARIOS_MENU:"Users",
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
            LNG_ALUMNO: "Alumno",
            LNG_ADMIN: "Administrador",
            LNG_CLASES_MENU: "Clases",
            LNG_TCLASE_MENU:"Tomar Clase",
            LNG_USUARIOS_MENU:"Usuarios",
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