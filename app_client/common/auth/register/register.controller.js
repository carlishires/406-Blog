(function () {

    angular
      .module('blogApp')
      .controller('RegisterController', registerUser);
  
      registerUser.$inject = ['$location','authentication'];
    function registerUser($location, authentication) {
      var vm = this;
  
      vm.pageHeader = {
        title: 'Create a new Blog account'
      };
  
      vm.credentials = {
        name : "",
        email : "",
        password : ""
      };
  
      vm.returnPage = $location.search().page || '/';
  
      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
          vm.formError = "All fields required, please try again";
          return false;
        } else {
          vm.doRegister();
        }
      };
  
      vm.doRegister = function() {
        vm.formError = "";
        authentication
          .register(vm.credentials)
          .error(function(err){
            vm.formError = err;
          })
          .then(function(data){
            authentication.saveToken(data.data.token);
            $location.search('page', null); 
            $location.path(vm.returnPage);
          }, function(err){
            vm.formError = err;
          }
          );
      };
  
    }
  
  })();
  