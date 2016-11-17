define([
    'require',
], function() {
    'use strict';

    angular.module('app.login', [])
        .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                modules: [{
                    name: "LoginModule",
                    files: ['js/modules/login/config/module.deps.js']
                }]
            });
        }]);


});