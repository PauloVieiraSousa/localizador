define([], function() {
    'use strict';

    angular.module('app.configuration', [])
        .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                modules: [{
                    name: "ConfigurationModule",
                    files: ['js/modules/configuration/config/module.deps.js']
                }]
            });
        }]);
});