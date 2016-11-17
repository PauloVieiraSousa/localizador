define([], function() {
    'use strict';

    angular.module('app.maps', [])
        .config(["$ocLazyLoadProvider", function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                modules: [{
                    name: "MapsModule",
                    files: ['js/modules/maps/config/module.deps.js']
                }]
            });
        }]);
});