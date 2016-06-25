'use strict';

angular.module('dashboard.model.message', []).service('MessageModel', ['$http', function ($http) {
    var _this = this;

    this.message = {};

    this.get = function (messageId, password) {
        return $http.get('/api/message', { params: { messageId: messageId, password: password, "XDEBUG_SESSION_START": 10372 } }).then(function (r) {
            _this.message = r.data;
            return _this.message;
        }).catch(function (r) {
            throw r.data.error;
        });
    };

    this.create = function (message) {
        return $http.post('/api/message', { message: message }).then(function (r) {
            _this.message = r.data;
            return _this.message;
        }).catch(function (r) {
            throw r.data.error;
        });
    };

    this.delete = function (messageId, password) {
        return $http.delete('/api/message', { params: { messageId: messageId, password: password, "XDEBUG_SESSION_START": 10372 } }).then(function (r) {
            _this.message = null;
            return r;
        }).catch(function (r) {
            throw r.data.error;
        });
    };
}]);