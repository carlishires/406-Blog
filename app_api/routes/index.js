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
var gameController = require('../controllers/tictactoe');

/* GET home page. */
router.get('/blog', blogController.listAllBlogs);
router.post('/blog', auth, blogController.addBlog);
router.get('/blog/:blogid', blogController.listSingleBlog);
router.put('/blog/:blogid', auth, blogController.editBlog);
router.delete('/blog/:blogid', auth, blogController.deleteBlog);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/:email', userController.isUser);

router.get('/tictactoe/:player', gameController.gameGetByPlayer);
router.post('/tictactoe', auth, gameController.gameCreateByPlayer);
router.delete('/tictactoe/:player', auth, gameController.gameDeleteByPlayer);
router.put('/tictactoe/:gameId', auth, gameController.gameTakeTurnById);


module.exports = router;
