angular.module('common').directive('radMenu', radMenu);
radMenu.$inject = ['$templateCache', '$state'];
function radMenu($templateCache, $state) {
    return {
        replace: true,
        restrict: 'AE',
        template: $templateCache.get('common/radMenu/radMenu.html'),
        scope: {},
        link: link
    };

    function link($scope) {
        $scope.isActive = (section)=> {
            return $state.is(section);
        }
    }
}

