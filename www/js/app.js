define([
    /**
     * Configurações gerais
     * */
    'config/app.vendor',
    'config/app.config',
    'config/app.run',
    /**
     * Modules
     */
    'modules/login/login.module',
    'modules/maps/maps.module',
    'modules/menu/menu.module',
    'modules/notification/notification.module',
    'modules/configuration/configuration.module',
    'modules/device/device.module'
], function() {
    'use strict';

    var app = angular.module('app', [
        'ionic',
        'oc.lazyLoad',
        'ngCordova',
        /**
         * Configurações gerais
         */
        'app.config',
        'app.run',
        'ui.router',
        /** Modules **/
        'app.login',
        'app.maps',
        'app.menu',
        'app.notification',
        'app.configuration',
        'app.device'
    ]);

    return app;

});