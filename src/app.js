angular.module('unavailable.it', [
    'ui.router',
    'dashboard.new-message'
])
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', ($httpProvider, $stateProvider, $urlRouterProvider) => {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        };
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
        //$httpProvider.defaults.transformRequest = '$httpParamSerializerJQLike';

        $httpProvider.interceptors.push('httpInterceptor');

        $urlRouterProvider.otherwise('/about');
        $stateProvider
            .state('dashboard', {
                    views: {
                        '@': {
                            templateUrl: 'src/dashboard/dashboard.tpl.html'
                        }
                    }
                }
            );
    }])
    .factory('httpInterceptor', function() {
        return {
            request: function (config) {
                if (config.url.indexOf('/api') === 0) {
                    config.url  = 'http://unavailable.it:8080'+config.url;
                    config.data = config.paramSerializer(angular.merge(config.data ||{}, {
                        "XDEBUG_SESSION_START": 10372
                    }));
                }

                return config;
            }
        };
    })
;
