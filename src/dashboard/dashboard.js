'use strict';
angular.module('dashboard.new-message', [
        'ui.router',
        'dashboard.model.message'
    ])
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider
            .state('dashboard.about', {
                url: '/about',
                views: {
                    body: {
                        controller:  'DashboardController',
                        templateUrl: 'src/dashboard/about.tpl.html'
                    }
                }
            })
            .state('dashboard.new-message', {
                url: '/new',
                views: {
                    body: {
                        controller:  'DashboardController',
                        templateUrl: 'src/dashboard/new-message.tpl.html'
                    }
                }
            })
            .state('dashboard.message-sent', {
                url: '/message-sent/:uri',
                views: {
                    body: {
                        controller:  'DashboardController',
                        templateUrl: 'src/dashboard/message-sent.tpl.html'
                    }
                }
            })
            .state('dashboard.open-message', {
                url: '/open-message/:messageId/:password',
                views: {
                    body: {
                        controller:  'DashboardController',
                        templateUrl: 'src/dashboard/open-message.tpl.html'
                    }
                },
                onEnter: ($stateParams, MessageModel) => {
                    MessageModel.get($stateParams.messageId, $stateParams.password);
                }
            })
        ;
    }])
    .controller('DashboardController', ['$scope', '$stateParams', '$state', 'MessageModel', function ($scope, $stateParams, $state, MessageModel) {
        $scope.MessageModel  = MessageModel;
        $scope.newMessage    = {};
        $scope.$stateParams  = $stateParams;

        $scope.saveNewMessage = () => {
            return MessageModel
                .create($scope.newMessage.body)
                .then(message => {
                    $state.go('dashboard.message-sent', {uri: "/open-message/"+message.message.message_id+"/"+message.password});
                })
                .catch(e => {
                    alert(e);
                });
        };

        $scope.deleteMessage = uri => {
            let uriParts  = uri.split('/'),
                password  = uriParts.pop(),
                messageId = uriParts.pop();

            return MessageModel
                .delete(messageId, password)
                .then(() => {
                    $state.go('dashboard.new-message');
                })
                .catch(e => {
                    alert(e);
                });
        }
    }])
;
