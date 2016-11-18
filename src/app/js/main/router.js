(function (angular) {
    angular.module('main').config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/main');

            $stateProvider.state('main', {
                url: '/main',
                controller: 'mainController',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('main/home/main.controller.html');
                }
            });

            $stateProvider.state('section', {
                url: '/section',
                controller: 'sectionController',
                templateProvider: function ($templateCache) {
                    return $templateCache.get('main/section/section.controller.html');
                }
            })
        }]);
})(angular);
