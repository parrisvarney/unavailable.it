'use strict';
angular.module('dashboard.model.message', [

    ])
    .service('MessageModel', ['$http', function($http) {
        this.message = {};

        this.get = (messageId, password) =>
            $http
                .get('/api/message', {params: {messageId, password, "XDEBUG_SESSION_START": 10372}})
                .then(r => {
                    this.message = r.data;
                    return this.message;
                })
                .catch(r => {
                    throw r.data.error
                });

        this.create = message =>
            $http
                .post('/api/message', {message})
                .then(r => {
                    this.message = r.data;
                    return this.message;
                })
                .catch(r => {
                    throw r.data.error
                });

        this.delete = (messageId, password) => {
            return $http
                .delete('/api/message', {params: {messageId, password, "XDEBUG_SESSION_START": 10372}})
                .then(r => {
                    this.message = null;
                    return r;
                })
                .catch(r => {
                    throw r.data.error
                });
        }
    }])
;
