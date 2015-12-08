
(function () {
    'use strict';

    angular
    .module('viper')
    .factory('notify', ['$http', function ($http) {
        var defaults = {
            // whether to hide the notification on click
            clickToHide: true,
            // whether to auto-hide the notification
            autoHide: false,
            // if autoHide, hide after milliseconds
            autoHideDelay: 5000,
            // show the arrow pointing at the element
            arrowShow: true,
            // arrow size in pixels
            arrowSize: 5,
            // position defines the notification position though uses the defaults below
            position: 'top right',
            // default style
            style: 'bootstrap',
            // default class (string or [string])
            className: 'error',
            // show animation
            showAnimation: 'slideDown',
            // show animation duration
            showDuration: 400,
            // hide animation
            hideAnimation: 'slideUp',
            // hide animation duration
            hideDuration: 200,
            // padding between element and notification
            gap: 2
        }
        return {
            success: success
        }
        function success(msg) {
            var props = jQuery.extend(true, {}, defaults);
            props.className = 'success';
            $.notify(msg, props);
        }
    }]);
})();