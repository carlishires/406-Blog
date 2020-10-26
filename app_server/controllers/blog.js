// app_server/controllers/blog.js
// Obsolete as of lab 5

var request = require('request');
var apiOptions = {
    server : "http://localhost"
};



module.exports.addBlog = function(req, res){
    res.render('addBlog', {title: 'Blog Add' });
};

module.exports.addBlogPost = function(req, res){
    var path = "/api/blog";
    var requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: {
            blogTitle: req.body.blogTitle,
            blogText: req.body.blogText
        },
        qs: {}
    };
    request(requestOptions, function(error, response, body) {
        res.redirect("/listBlog");
    });
};

module.exports.listBlog = function(req, res){
    var blogsList = "/api/blog";
    var requestOptions = {
        url: apiOptions.server + blogsList,
        method: "GET",
        json: {},
        qs: {}
    };
    request(requestOptions, function(error, response, body) {
        res.render('listBlog', {
            title: 'Blog List', 
            blog: body 
        });
    });
};

module.exports.deleteBlog = function(req, res){
    var path = "/api/blog/" + req.params.blogid;
    var requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {}
    };
    request(requestOptions, function(error, response, body){
        res.render('blogDelete', {
            title: 'Blog Delete',
            blog: body
        });
    });
}

module.exports.deleteBlogDelete = function(req, res){
    var path = "/api/blog/" + req.params.blogid;
    var requestOptions = {
        url: apiOptions.server + path,
        method: "DELETE",
        json: {},
        qs: {}
    };
    request(requestOptions, function(error, response, body) {
        res.redirect("/listBlog");
    });
}

module.exports.editBlog = function(req, res){
    var path = "/api/blog/" + req.params.blogid;
    var requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {}
    };
    request(requestOptions, function(error, response, body){
        res.render('blogEdit', {
            title: 'Blog Edit',
            blog: body
        });
    });
}

module.exports.editBlogPut = function(req, res){
    var path = "/api/blog/" + req.params.blogid;
    var requestOptions = {
        url: apiOptions.server + path,
        method: "PUT",
        json: {
            blogTitle: req.body.blogTitle,
            blogText: req.body.blogText
        },
        qs: {}
    };
    request(requestOptions, function(error, response, body) {
        res.redirect("/listBlog");
    });
}
