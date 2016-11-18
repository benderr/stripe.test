angular
    .module('main')
    .controller('sectionController', sectionController);

sectionController.$inject = ['$scope'];

function sectionController($scope) {
    $scope.test = "Hello world2";
}