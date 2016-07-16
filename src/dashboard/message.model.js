'use strict';
class MessageModel {
    constructor($http) {
        this.$http   = $http;
        this.message = {};
    }

    get(messageId, password) {
        return this.$http
            .get('/api/message', {params: {messageId, password, "XDEBUG_SESSION_START": 10372}})
            .then(r => {
                this.message = r.data;
                return this.message;
            })
            .catch(r => {
                throw r.data.error
            });
    }

    create(message) {
        return this.$http
            .post('/api/message', {message})
            .then(r => {
                this.message = r.data;
                return this.message;
            })
            .catch(r => {
                throw r.data.error
            });
    }

    destroy(messageId, password) {
        return this.$http
            .delete('/api/message', {params: {messageId, password, "XDEBUG_SESSION_START": 10372}})
            .then(r => {
                this.message = null;
                return r;
            })
            .catch(r => {
                throw r.data.error
            });
    }
}

angular.module('dashboard.model.message', [

]).service('MessageModel', MessageModel);
;
