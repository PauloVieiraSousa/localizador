define([
        '../services/UserSvc',
        '../services/DeviceStorage',
        '../services/AuthStorage',
        '../services/NotificationStorage'
    ], function(
        UserSvc,
        DeviceStorage,
        AuthStorage,
        NotificationStorage
    ) {
        'use strict';

        return angular.module('app.config', [])
            .constant('VERSION', '0')
            /* .constant("CONST", {
                 URL: "http://rastreadormobile.esy.es"
            
    })*/
    .constant('CONST', {
        URL: "http://192.168.15.5:8080"
    })
    .factory('UserSvc', UserSvc)
    .factory('DeviceStorage', DeviceStorage)
    .factory('AuthStorage', AuthStorage)
    .factory('NotificationStorage', NotificationStorage);

});