(function () {
    'use strict';

    angular.module('app.config', []).config(config);

    function config($httpProvider, fcsaNumberConfigProvider, $mdThemingProvider, $breadcrumbProvider) {



        $breadcrumbProvider.setOptions({

            template: '' +
                '<ul class="breadcrumb">' +
                    '<li ng-repeat="step in steps" ' +
                        'ng-class="{active: $last}" ng-switch="$last || !!step.abstract" ' +
                        'ng-if="steps[0].data.show">' +
                        '<a ng-switch-when="false" ' +
                           'href="{{step.ncyBreadcrumbLink}}"' +
                           'ng-bind="step.ncyBreadcrumbLabel"></a>' +
                        '<span ng-switch-when="true" ' +
                              'ng-bind="step.ncyBreadcrumbLabel"></span>' +
                    '</li>' +
                '</ul>'

        });

        $httpProvider.defaults.timeout = 5000;

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
        fcsaNumberConfigProvider.setDefaultOptions({
            thousandsSeparator: '.'
        });

        // This is the absolutely vital part, without this, changes will not cascade down through the DOM.
        $httpProvider.interceptors.push('AuthInterceptor');

    }

}());