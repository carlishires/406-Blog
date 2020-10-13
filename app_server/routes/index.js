var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var blogController = require('../controllers/blog');

/* GET home page. */
router.get('/', homeController.index);
router.get('/addBlog', blogController.addBlog);
router.post('/addBlog', blogController.addBlogPost);
router.get('/listBlog', blogController.listBlog);
router.get('/editBlog/:blogid', blogController.editBlog);
router.post('/editBlog/:blogid', blogController.editBlogPut);
router.get('/deleteBlog/:blogid', blogController.deleteBlog);
router.post('/deleteBlog/:blogid', blogController.deleteBlogDelete);

module.exports = router;
