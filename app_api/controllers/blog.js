// app_api/controllers/blog.js
var mongoose = require( 'mongoose' );
var Blog = mongoose.model('Blog');

var sendJsonResponse = function(res, status, content) {
    res.status(status); 
    res.json(content);
};

// GET
module.exports.listAllBlogs = function (req, res) { 
    Blog.find()
    .exec(function(err, foundBlog) {
        if (!foundBlog) {
            sendJsonResponse(res, 404, {
                "message": "no blogs found"
            });
            return;
        } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        sendJsonResponse(res, 200, buildBlogList(req, res, foundBlog));
    });
};

var buildBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function(obj) {
      blogs.push({
        blogTitle: obj.blogTitle,
        blogText: obj.blogText,
        createdOnDate: obj.createdOnDate,
        authorName: obj.authorName,
        authorEmail: obj.authorEmail,
        _id: obj._id
      });
    });
    return blogs;
  };

// POST
module.exports.addBlog = function (req, res) { 
    console.log("in add");
    Blog.create({
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        authorName: req.body.authorName,
        authorEmail: req.body.authorEmail,
        createdOnDate: req.body.createdOnDate
    }, 
    function(err, foundBlog) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 200, foundBlog);
        }
    });
};

// GET from id
module.exports.listSingleBlog = function (req, res) { 
    if (req.params && req.params.blogid) {
        Blog.findById(req.params.blogid)
        .exec(function(err, foundBlog) {
            if (!foundBlog) {
                sendJsonResponse(res, 404, {
                    "message": "blogid not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, foundBlog);
        });
    } else {
        sendJsonResponse(res, 404, { 
            "message": "No blogid in request"
        });
    }    
};

// PUT from id
module.exports.editBlog = function (req, res) { 
    Blog.findById(req.params.blogid)
    .exec(
        function(err, foundBlog) {
            foundBlog.blogTitle = req.body.blogTitle;
            foundBlog.blogText = req.body.blogText;
            foundBlog.authorName = req.body.authorName,
            foundBlog.authorEmail = req.body.authorEmail,
            foundBlog.save(function(err, foundBlog) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, foundBlog)
                }
            });        
        }
    );
};

// DELETE from id
module.exports.deleteBlog = function (req, res) { 
    var blogid = req.params.blogid;
    if (blogid) {
        Blog.findByIdAndRemove(blogid)
        .exec(
            function(err, foundBlog) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 204, null);
            }
        );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No blogid"
        });
    }
};


