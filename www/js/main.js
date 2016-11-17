(function() {
    "use strict";

    require.config({
        baseUrl: "js",
        urlArgs: "v=1.0",
        waitSeconds: 0,
        paths: {
            "angular": "../lib/ionic/js/angular/angular.min",
            "jQuery": "../lib/jquery/jquery.min",
            "ionic": "../lib/ionic/js/ionic.min",
            "uiRouter": "../lib/ionic/js/angular-ui/angular-ui-router.min",
            "angularAnimate": "../lib/ionic/js/angular/angular-animate.min",
            "angularSanitize": "../lib/ionic/js/angular/angular-sanitize.min",
            'ocLazyLoad': '../lib/ocLazyLoader/ocLazyLoad.require.min',
            'toastr': '../lib/toastr/toastr.min',
            'moment': '../lib/momentjs/moment.min',
            'ngCordova': '../lib/ngCordova/dist/ng-cordova.min'
        },
        shim: {
            "ngCordova": {
                exports: "ngCordova",
                deps: ["angular"]
            },
            "moment": {
                exports: "moment",
                deps: ["jQuery"]
            },
            "toastr": {
                exports: "toastr",
                deps: ["jQuery"]
            },
            "jQuery": {
                exports: "jQuery"
            },
            "angular": {
                exports: "angular"
            },
            'ocLazyLoad': {
                deps: ['angular'],
                exports: 'ocLazyLoad'
            },
            "uiRouter": {
                exports: "uiRouter",
                deps: ['angular']
            },
            "angularAnimate": {
                exports: "angularAnimate",
                deps: ["angular"]
            },
            "angularSanitize": {
                exports: "angularSanitize",
                deps: ["angular"]
            },
            "ionic": {
                ionic: {
                    exports: 'ionic',
                    deps: ['angular']
                }
            }
        },
        priority: [
            "angular",
            "ionic"
        ],
        deps: [
            "config/app.bootstrap"
        ]

    });

})()