define([
    'app'
], function(app) {
    'use strict';

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        /** 
         * Login
         * 
         */
            .state('login', {
                url: '/login',
                templateUrl: "js/modules/login/view/index.html",
                resolve: {
                    LoadDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('LoginModule')
                    }]
                },
                controller: 'LoginCtrl as vm'
            })
            /**
             * Aplicativo
             */
            .state('app', {
                url: '/app',
                abstract: true,
                resolve: {
                    LoadDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('MenuModule')
                    }]
                },
                controller: 'MenuCtrl as vm',
                templateUrl: 'js/modules/menu/view/menu.html'
            })
            /**
             * Maps
             */
            .state('app.map', {
                url: '/map',
                resolve: {
                    LoadDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('MapsModule')
                    }],
                    MapsData: MapsData
                },
                views: {
                    "menuContent": {
                        controller: 'MapsCtrl as vm',
                        templateUrl: 'js/modules/maps/view/index.html'
                    }
                }
            })
            /**
             * Notificações
             */
            .state('app.notification', {
                url: '/notification',
                resolve: {
                    LoadDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('NotificationModule')
                    }],
                    NotificationData: NotificationData
                },
                views: {
                    'menuContent': {
                        controller: "NotificationCtrl as vm",
                        templateUrl: 'js/modules/notification/view/index.html'
                    }
                }
            })
            .state('app.configuration', {
                url: '/configuration',
                resolve: {
                    LoadDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('ConfigurationModule')
                    }]
                },
                views: {
                    'menuContent': {
                        controller: 'ConfigurationCtrl as vm',
                        templateUrl: 'js/modules/configuration/view/index.html'
                    }
                }
            })
            .state('app.device', {
                url: '/device',
                resolve: {
                    LoadDeps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('DeviceModule')
                    }]
                },
                views: {
                    'menuContent': {
                        controller: "DeviceCtrl as vm",
                        templateUrl: 'js/modules/device/view/index.html'
                    }
                }
            });


        NotificationData.$inject = ["LoadDeps", "NotificationStorage", "$state"];

        function NotificationData(LoadDeps, NotificationStorage, $state) {
            return NotificationStorage.getNotifications();
        }

        MapsData.$inject = ["LoadDeps", "MapsSvc", "$state"];

        function MapsData(LoadDeps, MapsSvc, $state) {
            return MapsSvc.getCurrentLocator(1)
                .then(function(response) {
                    return response.data;
                })
                .catch(function() {
                    $state.go("error.500");
                });
        }

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    });

});