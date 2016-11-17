define([], function() {
    'use strict';

    angular.module('app.menu', [])
        .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                modules: [{
                    name: "MenuModule",
                    files: ['js/modules/menu/config/module.deps.js']
                }]
            });
        }]);
});