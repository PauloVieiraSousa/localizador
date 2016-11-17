define([], function() {
    'use strict';

    angular.module('app.notification', [])
        .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                modules: [{
                    name: "NotificationModule",
                    files: ['js/modules/notification/config/module.deps.js']
                }]
            });
        }]);
});