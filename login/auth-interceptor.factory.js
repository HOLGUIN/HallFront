(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['AuthTokenFactory'];

    function AuthInterceptor(AuthTokenFactory) {

        return {
            //so we'll have 'request' and it will be 'addToken'.
            request: addToken
        };

        function addToken(config) {

            var token = AuthTokenFactory.getToken();
            //  Now if there is a token, so if the user is authenticated.
            if (token) {
                // then we're going to add this to a header on this config object,
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

    }

}());

