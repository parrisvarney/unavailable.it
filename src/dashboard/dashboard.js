'use strict';
class DashboardController {
    constructor($state, $stateParams, MessageModel) {
        this.$state       = $state;
        this.$stateParams = $stateParams;
        this.MessageModel = MessageModel;
    }

    saveNewMessage(messageBody) {
        return this.MessageModel
            .create(messageBody)
            .then(message => {
                this.$state.go('dashboard.message-sent', {
                    uri: "/open-message/"+message.message.message_id+"/"+message.password
                });
            })
            .catch(e => {
                alert(e);
            });
    }

    deleteMessage(uri) {
        let uriParts  = uri.split('/'),
            password  = uriParts.pop(),
            messageId = uriParts.pop();

        return this.MessageModel
            .destroy(messageId, password)
            .then(() => {
                this.$state.go('dashboard.new-message');
            })
            .catch(e => {
                alert(e);
            });
    }

    restart() {
        return this.$state.go('dashboard.about')
    }
}

angular.module('dashboard', [
    'dashboard.model.message'
]).controller('DashboardController', DashboardController);
