// app_api/routes/index.js
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt'); 
var auth = jwt({
    secret: process.env.JWT_SECRET, 
    userProperty: 'payload',
    algorithms: ["HS256"]
    });
var blogController = require('../controllers/blog');
var userController = require('../controllers/authentication');

/* GET home page. */
router.get('/blog', blogController.listAllBlogs);
router.post('/blog', auth, blogController.addBlog);
router.get('/blog/:blogid', blogController.listSingleBlog);
router.put('/blog/:blogid', auth, blogController.editBlog);
router.delete('/blog/:blogid', auth, blogController.deleteBlog);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
