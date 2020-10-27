// app_client/blogApp.js
// Created for lab 5
// DO THE DELETE THING
var app = angular.module('blogApp', ['ngRoute']);

// Router Provider
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller:'HomeController',
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
    .otherwise({redirectTo: '/'});
    
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

function addBlog($http, data) {
  return $http.post("/api/blog/", data);
}

function getBlogById($http, id) {
    return $http.get('/api/blog/' + id);
}

function updateBlogById($http, id, data) {
    return $http.put('/api/blog/' + id, data);
}

function deleteBlogById($http, id) {
  return $http.delete('/api/blog/' + id);
}

// Controllers
app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };
    
    getAllBlogs($http)
       .then (function(data) {
        vm.blogs = data.data;
        vm.message = "Blog Data Found!";
      },
      function (err) {
        vm.message = "Could not get list of blog posts";
      });
});

app.controller('AddController', [ '$http', '$routeParams', '$window', function AddController($http, $routeParams, $window) {
  var vm = this;
  vm.blog = {};
  vm.pageHeader = {
      title: 'Blog Add'
  };

  // Submit function attached to ViewModel for use in form
  vm.submit = function() {
    var data = vm.blog;
    data.blogTitle = userForm.blogTitle.value;
    data.blogText = userForm.blogText.value;
           
    addBlog($http, data)
      .then (function(data) {
        vm.message = "Blog data added!";
        $window.location.assign('/listBlog');
      },
      function (e) {
        vm.message = "Could not add blog post"; 
      });
}

}]);

// fix the thing where content dissapears when page refreshes
app.controller('EditController', [ '$http', '$routeParams', '$window', function EditController($http, $routeParams, $window) {
    var vm = this;
    vm.blog = {};       // blank post
    vm.id = $routeParams.id;    // Get id from $routeParams which must be injected and passed into controller
    vm.pageHeader = {
        title: 'Blog Edit'
    };
    
    // Get blog post data to be displayed on edit page
    getBlogById($http, vm.id)
      .then (function(data) {
        vm.blog = data.data;
        vm.message = "Blog data found!";
      },
      function (err) {
        vm.message = "Could not get blog post given id of " + vm.id;
      });
    
    // Submit function attached to ViewModel for use in form
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogText = userForm.blogText.value;
               
        updateBlogById($http, vm.id, data)
          .then (function(data) {;
            vm.message = "Blog data updated!";
            $window.location.assign('/listBlog');
          },
          function (e) {
            vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
          });
    };
}]);

// get window to work
app.controller('DeleteController', [ '$http', '$routeParams','$window', function DeleteController($http, $routeParams, $window) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id; 
  vm.pageHeader = {
      title: 'Blog Delete'
  };

  getBlogById($http, vm.id)
      .then (function(data) {
        vm.blog = data.data;
        vm.message = "Blog data found!";
      },
      function (err) {
        vm.message = "Could not get blog post given id of " + vm.id;
      });    
  
  vm.submit = function() {
    var data = {};
    deleteBlogById($http, vm.id)
      .then (function(data) {;
        vm.message = "Blog data deleted!";
        $window.location.assign('/listBlog');
      },
      function (e) {
        vm.message = "Could not delete blog given id of " + vm.id;
      }); 
  }  
  
  vm.cancel = function() {
    $window.location.assign('/listBlog');
  } 
  
}]);