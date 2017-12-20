(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthTokenFactory', AuthTokenFactory);

    AuthTokenFactory.$inject = ['$window' ];

    function AuthTokenFactory($window) {

        var store = $window.localStorage,
            key = 'auth-token',
            keyUrl = 'url-token';

        return {
            getToken: getToken,
            setToken: setToken
        };

        function getToken() {
            return store.getItem(key);
        }

        function setToken(data) {
            if (data) {
                store.setItem(key, data.md5);
                store.setItem('usuario',JSON.stringify(data));    
                store.setItem('idioma', 'es');         
            } else {
                store.removeItem(key);
                store.removeItem('usuario');
                store.removeItem('idioma');            
            }
        }

    }

}());