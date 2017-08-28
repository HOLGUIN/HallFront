(function () {
    'use strict';

    angular.module('app.config', []).config(config);

    function config($httpProvider, $mdThemingProvider, $translateProvider) {

        //Esta es la configuracion necesaria para la plataforma multilenguaje
        $translateProvider.fallbackLanguage('en');
        $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
            'en_*': 'en',
            'es_*': 'es'
        })
        $translateProvider.translations('en', {
            QUESTION: "Where are you going?",
            SALUDO: "Hello",
            BUTTON_LANG_EN: "english",
            BUTTON_LANG_ES: "spanish"
        });

        $translateProvider.translations('es', {
            QUESTION: "Á donde te vas?",
            SALUDO: "Hola",
            BUTTON_LANG_EN: "inglés",
            BUTTON_LANG_ES: "español"
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