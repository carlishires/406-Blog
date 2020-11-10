var app = angular.module('blogApp');

//*** Directives ***
app.directive('navigation', function() {
    return {
      restrict: 'EA',
      templateUrl: '/common/nav/navigation.html',
      controller: 'NavigationController as navvm'
    };
});


//*** Controller ***
app.controller('NavigationController', ['$window', 'authentication', function NavigationController($window, authentication) {
    var vm = this;
    vm.currentPath = $window.location.pathname;
    vm.currentUser = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = function() {
      authentication.logout();
      $window.location.assign('/');
    };
}]);
