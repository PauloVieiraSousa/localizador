define([], function() {
    'use strict';

    angular.module("app")
        .controller("MenuCtrl", MenuCtrl);

    MenuCtrl.$inject = ["UserSvc", "$state","AuthStorage", "DeviceStorage"];

    function MenuCtrl(UserSvc, $state, AuthStorage, DeviceStorage) {
        var vm = this;

        vm.logOut = logOut;

        vm.user = UserSvc.getUser();

        //////////////////////////////////
        function logOut() {
            AuthStorage.remove();
            DeviceStorage.remove();
            UserSvc.remove();
            $state.go('login');
        }
    }
});