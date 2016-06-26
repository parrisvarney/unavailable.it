'use strict';

angular.module('dashboard.new-message', ['ui.router', 'dashboard.model.message']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('dashboard.about', {
        url: '/about',
        views: {
            body: {
                controller: 'DashboardController',
                templateUrl: 'src/dashboard/about.tpl.html'
            }
        }
    }).state('dashboard.new-message', {
        url: '/new',
        views: {
            body: {
                controller: 'DashboardController',
                templateUrl: 'src/dashboard/new-message.tpl.html'
            }
        }
    }).state('dashboard.message-sent', {
        url: '/message-sent/:uri',
        views: {
            body: {
                controller: 'DashboardController',
                templateUrl: 'src/dashboard/message-sent.tpl.html'
            }
        }
    }).state('dashboard.open-message', {
        url: '/open-message/:messageId/:password',
        views: {
            body: {
                controller: 'DashboardController',
                templateUrl: 'src/dashboard/open-message.tpl.html'
            }
        },
        onEnter: function onEnter($stateParams, MessageModel) {
            MessageModel.get($stateParams.messageId, $stateParams.password).catch(function (r) {
                return $stateParams.error = r;
            });
        }
    });
}]).controller('DashboardController', ['$scope', '$stateParams', '$state', 'MessageModel', function ($scope, $stateParams, $state, MessageModel) {
    $scope.MessageModel = MessageModel;
    $scope.newMessage = {};
    $scope.$stateParams = $stateParams;

    $scope.saveNewMessage = function () {
        return MessageModel.create($scope.newMessage.body).then(function (message) {
            $state.go('dashboard.message-sent', { uri: "/open-message/" + message.message.message_id + "/" + message.password });
        }).catch(function (e) {
            alert(e);
        });
    };

    $scope.restart = function () {
        return $state.go('dashboard.about');
    };

    $scope.deleteMessage = function (uri) {
        var uriParts = uri.split('/'),
            password = uriParts.pop(),
            messageId = uriParts.pop();

        return MessageModel.delete(messageId, password).then(function () {
            $state.go('dashboard.new-message');
        }).catch(function (e) {
            alert(e);
        });
    };
}]);