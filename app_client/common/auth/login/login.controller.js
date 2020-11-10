(function () {

    angular
      .module('blogApp')
      .controller('LoginController', loginUser);
  
    loginUser.$inject = ['$location','authentication'];
    function loginUser($location, authentication) {
      var vm = this;
  
      vm.pageHeader = {
        title: 'Sign in to Blog'
      };
  
      vm.credentials = {
        email : "",
        password : ""
      };
  
      vm.returnPage = $location.search().page || '/';
  
      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.email || !vm.credentials.password) {
          vm.formError = "All fields required, please try again";
          return false;
        } else {
          vm.doLogin();
        }
      };
  
      vm.doLogin = function() {
        vm.formError = "";
        authentication
          .login(vm.credentials)
          .then(function(data){
            authentication.saveToken(data.data.token);
            $location.search('page', null); 
            $location.path(vm.returnPage);
          },
          function(err){
            vm.formError = "Account does not exist. Please try a different email or password."
          });
      }
  
    }
  
  })();