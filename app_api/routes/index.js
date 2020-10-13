// app_api/routes/index.js
var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blog');

/* GET home page. */
router.get('/blog', blogController.listAllBlogs);
router.post('/blog', blogController.addBlog);
router.get('/blog/:blogid', blogController.listSingleBlog);
router.put('/blog/:blogid', blogController.editBlog);
router.delete('/blog/:blogid', blogController.deleteBlog);

module.exports = router;
