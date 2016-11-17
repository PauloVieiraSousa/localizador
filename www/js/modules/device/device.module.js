define([], function() {
    'use strict';

    angular.module('app.device', [])
        .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                modules: [{
                    name: "DeviceModule",
                    files: ['js/modules/device/config/module.deps.js']
                }]
            });
        }]);
});