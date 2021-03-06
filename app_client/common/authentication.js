// app_client
var app = angular.module('blogApp');

//*** Authentication Service and Methods **
app.service('authentication', authentication);
    authentication.$inject = ['$window', '$http'];
    function authentication ($window, $http) {
    
        var saveToken = function (token) {
            $window.localStorage.setItem('blog-token', token);
        };
                                       
        var getToken = function () {
            return $window.localStorage.getItem('blog-token');
        };
        
        var register = function(user) {
            return $http.post('/api/register', user);
        };
     
        var login = function(user) {
            return $http.post('/api/login', user);
        };
        
        var logout = function() {
            $window.localStorage.removeItem('blog-token');
        };
        
        var isLoggedIn = function() {
          var token = getToken();
          
          if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        var currentUser = function() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
              email : payload.email,
              name : payload.name
            };
          }
        };

        var isUser = function(email) {
          return $http.get('/api/user/' + email);
        };

        return {
          saveToken : saveToken,
          getToken : getToken,
          register : register,
          login : login,
          logout : logout,
          isLoggedIn : isLoggedIn,
          currentUser : currentUser,
          isUser: isUser
        };
}
