(function (module) {
    'use strict';

    module.config(function ($provide, toastrConfig) {

        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                var loggingFactory = $injector.get("loggingFactory");
                loggingFactory.addException(exception);
                $delegate(exception, cause);
            };
        });


        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: false,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });

    });

})(angular.module('utilities.logging'));
