///#source 1 1 /app/debugging/app.config.js
(function (module) {
    'use strict';

    module.config(function ($provide) {
        $provide.decorator('$interpolate', function ($delegate) {

            var interpolationFnWrap = function (interpolationFn, interpolationArgs) {
                return function () {
                    var result = interpolationFn.apply(this, arguments),
                        log = result ? console.log : console.warn;
                    log.call(console, 'interpolation of  ' + interpolationArgs[0].trim(),
                                      ':', result.trim());
                    return result;
                };
            };

            var interpolateWrap = function () {
                var interpolationFn = $delegate.apply(this, arguments);
                if (interpolationFn) {
                    return interpolationFnWrap(interpolationFn, arguments);
                }
            };
            
            angular.extend(interpolateWrap, $delegate);
            return interpolateWrap;

        });
    });

}(angular.module('utilities.debugging')));

///#source 1 1 /app/debugging/app.module.js
(function () {
    'use strict';

    angular.module('utilities.debugging', []);
}());

///#source 1 1 /app/logging/services/loggingFactory.js
(function (module) {
    'use strict';
    
    function loggingFactory($http, toastr) {
        var url = '/api/logging/addlog',
        logs = [];

        //#region public functios
        function addSuccess(message, pushToServer) {
            addLog('success', message, pushToServer);
            toastr.success(message);
        };

        function addInfo(message, pushToServer) {
            addLog('info', message, pushToServer);
            toastr.info(message);
        };

        function addWarning(message, pushToServer) {
            addLog('warning', message, pushToServer);
            toastr.warning(message);
        };

        function addError(message, pushToServer) {
            addLog('error', message, pushToServer);
            toastr.error(message);
        };

        function addException(message, pushToServer) {
            addLog('exception', message, pushToServer);
            toastr.error(message);
        };
        //#endregion

        //#region private functios
        function addLog(type, message, pushToServer) {
            var data = { type: type, message: message };

            logs.push(data);

            if (pushToServer) {
                $http.post(url, data)
                .catch(function (error) {
                    addException(error, false);
                });
            }
        };
        //#endregion


        return {
            addSuccess: addSuccess,
            addInfo: addInfo,
            addWarning: addWarning,
            addError: addError,
            addException: addException,
            logs: logs
        };
        
    }

    loggingFactory.$inject = ['$http', 'toastr'];

    module.factory('loggingFactory', loggingFactory);

}(angular.module('utilities.logging')));
///#source 1 1 /app/logging/app.config.js
(function (module) {
    'use strict';

    module.config(function ($provide, toastrConfig) {

        $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
            return function (exception, cause) {
                var loggingFactory = $injector.get('loggingFactory');
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

}(angular.module('utilities.logging')));

///#source 1 1 /app/logging/app.module.js
(function () {
    'use strict';

    angular.module('utilities.logging', [
        'ngAnimate',
        'toastr'
    ]);
}());

///#source 1 1 /app/shared/app.module.js
(function () {
    'use strict';

    angular.module('shared', []);
}());

///#source 1 1 /app/app.module.js
(function () {
    'use strict';

    angular.module('utilities', [
        'shared',
        'utilities.logging',
        'utilities.debugging',
    ]);
}());

