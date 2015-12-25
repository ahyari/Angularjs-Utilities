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