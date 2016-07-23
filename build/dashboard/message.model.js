'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageModel = function () {
    function MessageModel($http) {
        _classCallCheck(this, MessageModel);

        this.$http = $http;
        this.message = {};
    }

    _createClass(MessageModel, [{
        key: 'get',
        value: function get(messageId, password) {
            var _this = this;

            return this.$http.get('/api/message', { params: { messageId: messageId, password: password, "XDEBUG_SESSION_START": 10372 } }).then(function (r) {
                _this.message = r.data;
                return _this.message;
            }).catch(function (r) {
                throw r.data.error;
            });
        }
    }, {
        key: 'create',
        value: function create(message) {
            var _this2 = this;

            return this.$http.post('/api/message', { message: message }).then(function (r) {
                _this2.message = r.data;
                return _this2.message;
            }).catch(function (r) {
                throw r.data.error;
            });
        }
    }, {
        key: 'destroy',
        value: function destroy(messageId, password) {
            var _this3 = this;

            return this.$http.delete('/api/message', { params: { messageId: messageId, password: password, "XDEBUG_SESSION_START": 10372 } }).then(function (r) {
                _this3.message = null;
                return r;
            }).catch(function (r) {
                throw r.data.error;
            });
        }
    }]);

    return MessageModel;
}();

angular.module('dashboard.model.message', []).service('MessageModel', MessageModel);
;