var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var blogController = require('../controllers/blog');

/* GET home page. */
router.get('/', homeController.index);
router.get('/addBlog', blogController.addBlog);
router.get('/listBlog', blogController.listBlog);

module.exports = router;
