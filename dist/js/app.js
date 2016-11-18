window.app = (function () {
    function startApplication() {
        angular.bootstrap(document, ['app']);
    }

    angular.element(document).ready(function () {
        startApplication();
    });
})(angular);



