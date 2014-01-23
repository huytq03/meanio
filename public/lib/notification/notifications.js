(function (define) {
  define(['jquery'], function ($) {
    return (function () {
            var version = '1.0',
                $container,
                notificationType = {
                    error: 'error',
                    info: 'info',
                    success: 'success',
                    warning: 'warning'
                },
                listener,
                notificationId = 0,
                defaults = {
                    tapToDismiss: true,
                    notificationClass: 'notification',
                    containerId: 'notification-container',
                    debug: false,
                    fadeIn: 300,
                    onFadeIn: undefined,
                    fadeOut: 1000,
                    onFadeOut: undefined,
                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'notification-error',
                        info: 'notification-info',
                        success: 'notification-success',
                        warning: 'notification-warning'
                    },
                    iconClass: 'notification-info',
                    positionClass: 'notification-bottom-right',
                    timeOut: 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
                    titleClass: 'notification-title',
                    messageClass: 'notification-message',
                    target: 'body',
                    newestOnTop: true
                },
                error = function (message, title, optionsOverride) {
                    return notify({
                        type:  notificationType.error,
                        iconClass: getOptions().iconClasses.error,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                },
                info = function (message, title, optionsOverride) {
                    return notify({
                        type:  notificationType.info,
                        iconClass: getOptions().iconClasses.info,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                },
                subscribe = function (callback) {
                    listener = callback;
                },
                success = function (message, title, optionsOverride) {
                    return notify({
                        type:  notificationType.success,
                        iconClass: getOptions().iconClasses.success,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                },
                warning = function (message, title, optionsOverride) {
                    return notify({
                        type:  notificationType.warning,
                        iconClass: getOptions().iconClasses.warning,
                        message: message,
                        optionsOverride: optionsOverride,
                        title: title
                    });
                },
                clear = function ($notificationElement) {
                    var options = getOptions();
                    if (!$container) {
                        getContainer(options);
                    }
                    if ($notificationElement && $(':focus', $notificationElement).length === 0) {
                        $notificationElement.fadeOut(options.fadeOut, function () {
                            removeNotification($notificationElement);
                        });
                        return;
                    }
                    if ($container.children().length) {
                        $container.fadeOut(options.fadeOut, function () {
                            $container.remove();
                        });
                    }
                };
            var notification = {
                clear: clear,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: version,
                warning: warning
            };
            return notification;
            //#region Internal Methods
            function publish(args) {
                if (!listener) {
                    return;
                }
                listener(args);
            }
            function notify(map) {
                var
                    options = getOptions(),
                    iconClass = map.iconClass || options.iconClass;
                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }
                notificationId++;
                $container = getContainer(options);
                var
                    intervalId = null,
                    $notificationElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    response = {
                        notificationId: notificationId,
                        state: 'visible',
                        startTime: new Date(),
                        options: options,
                        map: map
                    };
                if (map.iconClass) {
                    $notificationElement.addClass(options.notificationClass).addClass(iconClass);
                }
                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass);
                    $notificationElement.append($titleElement);
                }
                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass);
                    $notificationElement.append($messageElement);
                }
                $notificationElement.hide();
                if (options.newestOnTop) {
                    $container.prepend($notificationElement);
                } else {
                    $container.append($notificationElement);
                }
                $notificationElement.fadeIn(options.fadeIn, options.onFadeIn);
                if (options.timeOut > 0) {
                    intervalId = setTimeout(fadeAway, options.timeOut);
                }
                $notificationElement.hover(stickAround, delayedFadeAway);
                if (!options.onclick && options.tapToDismiss) {
                    $notificationElement.click(fadeAway);
                }
                if (options.onclick) {
                    $notificationElement.click(function () {
                        options.onclick() && fadeAway();
                    });
                }
                publish(response);
                if (options.debug && console) {
                    console.log(response);
                }
                return $notificationElement;
                function fadeAway() {
                    if ($(':focus', $notificationElement).length > 0) {
                        return;
                    }
                    return $notificationElement.fadeOut(options.fadeOut, function () {
                        removeNotification($notificationElement);
                        if (options.onFadeOut) {
                            options.onFadeOut();
                        }
                        response.state = 'hidden';
                        response.endTime = new Date(),
                        publish(response);
                    });
                }
                function delayedFadeAway() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(fadeAway, options.extendedTimeOut);
                    }
                }
                function stickAround() {
                    clearTimeout(intervalId);
                    $notificationElement.stop(true, true).fadeIn(options.fadeIn);
                }
            }
            function getContainer(options) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);
                $container.appendTo($(options.target));
                return $container;
            }
            function getOptions() {
                return $.extend({}, defaults, notification.options);
            }
            function removeNotification($notificationElement) {
                if (!$container) { $container = getContainer(); }
                if ($notificationElement.is(':visible')) {
                    return;
                }
                $notificationElement.remove();
                $notificationElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                }
            }
            //#endregion
        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require(deps[0]));
    } else {
        window['notification'] = factory(window['jQuery']);
    }
}));