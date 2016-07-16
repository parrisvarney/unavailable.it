'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DashboardController = function () {
    function DashboardController($state, $stateParams, MessageModel) {
        _classCallCheck(this, DashboardController);

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.MessageModel = MessageModel;
    }

    _createClass(DashboardController, [{
        key: 'saveNewMessage',
        value: function saveNewMessage(messageBody) {
            var _this = this;

            return this.MessageModel.create(messageBody).then(function (message) {
                _this.$state.go('dashboard.message-sent', {
                    uri: "/open-message/" + message.message.message_id + "/" + message.password
                });
            }).catch(function (e) {
                alert(e);
            });
        }
    }, {
        key: 'deleteMessage',
        value: function deleteMessage(uri) {
            var _this2 = this;

            var uriParts = uri.split('/'),
                password = uriParts.pop(),
                messageId = uriParts.pop();

            return this.MessageModel.destroy(messageId, password).then(function () {
                _this2.$state.go('dashboard.new-message');
            }).catch(function (e) {
                alert(e);
            });
        }
    }, {
        key: 'restart',
        value: function restart() {
            return this.$state.go('dashboard.about');
        }
    }]);

    return DashboardController;
}();

angular.module('dashboard', ['dashboard.model.message']).controller('DashboardController', DashboardController);