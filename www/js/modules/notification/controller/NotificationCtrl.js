define([], function() {
    'use strict';

    angular.module("app")
        .controller("NotificationCtrl", NotificationCtrl);

    NotificationCtrl.$inject = ["NotificationData", "NotificationStorage"];

    function NotificationCtrl(NotificationData, NotificationStorage) {
        var vm = this;

        vm.NotificationData = NotificationData;

        vm.clearItem = clearItem;

        function clearItem(notification) {
            return NotificationStorage.clearNotification(notification.item);
        }


    }
});