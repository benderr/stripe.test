angular
    .module('main')
    .controller('mainController', mainController);

mainController.$inject = ['$scope'];

function mainController($scope) {
    $scope.test = "Hello world";
}