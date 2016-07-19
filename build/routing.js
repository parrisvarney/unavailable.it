'use strict';

angular.module('unavailable.it').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('dashboard.about', {
        url: '/about',
        views: {
            body: {
                controller: 'DashboardController',
                controllerAs: 'vm',
                templateUrl: 'src/dashboard/about.tpl.html'
            }
        }
    }).state('dashboard.new-message', {
        url: '/new',
        views: {
            body: {
                controller: 'DashboardController',
                controllerAs: 'vm',
                templateUrl: 'src/dashboard/new-message.tpl.html'
            }
        }
    }).state('dashboard.message-sent', {
        url: '/message-sent/:uri',
        views: {
            body: {
                controller: 'DashboardController',
                controllerAs: 'vm',
                templateUrl: 'src/dashboard/message-sent.tpl.html'
            }
        }
    }).state('dashboard.open-message', {
        url: '/open-message/:messageId/:password',
        views: {
            body: {
                controller: 'DashboardController',
                controllerAs: 'vm',
                templateUrl: 'src/dashboard/open-message.tpl.html'
            }
        },
        onEnter: function onEnter($stateParams, MessageModel) {
            MessageModel.get($stateParams.messageId, $stateParams.password).catch(function (r) {
                return $stateParams.error = r;
            });
        }
    });
}]);