// app_client/blogApp.js
// Created for lab 5
var app = angular.module('blogApp', ['ngRoute']);

// Router Provider
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .when('/listBlog', {
      templateUrl: 'pages/listBlog.html',
      controller: 'ListController',
      controllerAs: 'vm'
    })
    .when('/addBlog', {
      templateUrl: 'pages/addBlog.html',
      controller: 'AddController',
      controllerAs: 'vm'
    })
    .when('/editBlog/:id', {
      templateUrl: 'pages/editBlog.html',
      controller: 'EditController',
      controllerAs: 'vm'
    })
    .when('/deleteBlog/:id', {
      templateUrl: 'pages/deleteBlog.html',
      controller: 'DeleteController',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'common/auth/register/register.view.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'common/auth/login/login.view.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

// Controllers
app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.pageHeader = {
    title: "Carli Shires Blog Site"
  };
  vm.message = "Welcome to my blog. I am a Computer Science student at Millersville University. I will be graduating this Spring :).";
});

// REST Web API functions
function getAllBlogs($http) {
  return $http.get('/api/blog');
}

function addBlog($http, data, authentication) {
  return $http.post("/api/blog/", data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function getBlogById($http, id) {
  return $http.get('/api/blog/' + id);
}

function updateBlogById($http, id, data, authentication) {
  return $http.put('/api/blog/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function deleteBlogById($http, id, authentication) {
  return $http.delete('/api/blog/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function registerUser($http, data) {
  return $http.post('/api/register/', data);
}

function loginUser($http, data) {
  return $http.post('/api/login/' , data);
}
// Controllers
app.controller('ListController', ['$http', 'authentication', function ListController($http, authentication) {
  var vm = this;
  vm.pageHeader = {
    title: 'Blog List'
  };

  vm.isLoggedIn = authentication.isLoggedIn();

  getAllBlogs($http)
    .then(function (data) {
      vm.blogs = data.data;
      vm.message = "Blog Data Found!";
    },
      function (err) {
        vm.message = "Could not get list of blog posts";
      });
}]);

app.controller('AddController', ['$http', '$routeParams', '$location', 'authentication', '$window', function AddController($http, $routeParams, $location, authentication, $window) {
  var vm = this;
  vm.blog = {};
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentPath = $location.path(); 
  vm.pageHeader = {
    title: 'Blog Add'
  };

  // Submit function attached to ViewModel for use in form
  vm.submit = function () {
    var data = vm.blog;
    data.blogTitle = userForm.blogTitle.value;
    data.blogText = userForm.blogText.value;

    addBlog($http, data, authentication)
      .then(function (data) {
        vm.message = "Blog data added!";
        $window.location.assign('/listBlog');
      },
        function (e) {
          vm.message = "Could not add blog post";
        });
  }

}]);

// fix the thing where content dissapears when page refreshes
app.controller('EditController', ['$http', '$routeParams', '$location', 'authentication', '$window', function EditController($http, $routeParams, $location, authentication, $window) {
  var vm = this;
  vm.blog = {};       // blank post
  vm.id = $routeParams.id;    // Get id from $routeParams which must be injected and passed into controller
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentPath = $location.path()
  vm.pageHeader = {
    title: 'Blog Edit'
  };

  // Get blog post data to be displayed on edit page
  getBlogById($http, vm.id)
    .then(function (data) {
      vm.blog = data.data;
      vm.message = "Blog data found!";
    },
      function (err) {
        vm.message = "Could not get blog post given id of " + vm.id;
      });

  // Submit function attached to ViewModel for use in form
  vm.submit = function () {
    var data = vm.blog;
    data.blogTitle = userForm.blogTitle.value;
    data.blogText = userForm.blogText.value;

    updateBlogById($http, vm.id, data, authentication)
      .then(function (data) {
        ;
        vm.message = "Blog data updated!";
        $window.location.assign('/listBlog');
      },
        function (e) {
          vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
        });
  };
}]);

// get window to work
app.controller('DeleteController', ['$http', '$routeParams', '$location', 'authentication', '$window', function DeleteController($http, $routeParams, $location, authentication, $window) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentPath = $location.path();

  vm.pageHeader = {
    title: 'Blog Delete'
  };

  getBlogById($http, vm.id)
    .then(function (data) {
      vm.blog = data.data;
      vm.message = "Blog data found!";
    },
      function (err) {
        vm.message = "Could not get blog post given id of " + vm.id;
      });

  vm.submit = function () {
    var data = {};
    deleteBlogById($http, vm.id, authentication)
      .then(function (data) {
        ;
        vm.message = "Blog data deleted!";
        $window.location.assign('/listBlog');
      },
        function (e) {
          vm.message = "Could not delete blog given id of " + vm.id;
        });
  }

  vm.cancel = function () {
    $window.location.assign('/listBlog');
  }

}]);