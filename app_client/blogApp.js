// app_client/blogApp.js
// Created for lab 5
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

function addNewBlog($http, data) {
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

app.controller('AddController', [ '$http', '$routeParams', function AddController($http, $routeParams) {
  var vm = this;
  vm.blog = {};       // blank post
// vm.id = $routeParams.id;    // Get id from $routeParams which must be injected and passed into controller
  vm.pageHeader = {
      title: 'Blog Add'
  };

  // Submit function attached to ViewModel for use in form
  vm.submit = function() {
    var data = vm.blog;
    data.blogTitle = userForm.blogTitle.value;
    data.blogText = userForm.blogText.value;
           
    updateBlogById($http, vm.id, data)
      .then (function(data) {
        console.log("blog data updated");
        vm.message = "Blog data updated!";
        //$state.go('listBlog'); 
      },
      function (e) {
        console.log("lol");
        vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
      });
}

}]);

// add window?
// fix the thing where content dissapears when page refreshes
app.controller('EditController', [ '$http', '$routeParams', function EditController($http, $routeParams) {
    var vm = this;
    vm.blog = {};       // blank post
    vm.id = $routeParams.id;    // Get id from $routeParams which must be injected and passed into controller
    vm.pageHeader = {
        title: 'Blog Edit'
    };
    
    // Get blog post data to be displayed on edit page
    getBlogById($http, vm.id)
      .then (function(data) {
        console.log(data);
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
          .then (function(data) {
            console.log("blog data updated");
            vm.message = "Blog data updated!";
            //$state.go('listBlog'); 
          },
          function (e) {
            console.log("lol");
            vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
          });
    }
}]);