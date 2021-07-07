// app_api/controllers
// Created for Lab 8
var mongoose = require('mongoose');
const { send } = require('process');
var Game = mongoose.model('Game');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

//wip
module.exports.gameGetByPlayer = function(req, res) {
    if (req.params) {
        if (req.params.player) {
            Game
                .findOne({
                    $or: [
                        {p1: req.params.player},
                        {p2: req.params.player}
                    ]
                })
                .exec(function(err, game) {
                    if (!game) {
                        sendJsonResponse(res, 404, {
                            "message": "No games found for this user"
                        });
                        return
                    } else if (err) {
                        sendJsonResponse(res,404,err);
                        return;
                    }
                    sendJsonResponse(res, 200, game)
                });
        } else {
            sendJsonResponse(res, 404, {
               "message": "User does not exist" 
            });
            return;
        }
    }
};

// sets up a game 
module.exports.gameCreateByPlayer = function(req,res) {
    if (req.body.p1 && req.body.p2) {
        var rand = Math.floor(Math.random() * 2);
        var randPlayer = rand == 0 ? req.body.p1 : req.body.p2;
        console.log("player1:" + req.body.p1);
        console.log("player2:" + req.body.p2);
        Game
            .create({
                p1: req.body.p1,
                p2: req.body.p2,
                currentPlayer: randPlayer
            }, function (err,game) {
                if (err) {
                    sendJsonResponse(res, 400, err);
                } else {
                    sendJsonResponse(res, 201, game);
                }
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Game cannot be played without two players"
        });   
    }
};

module.exports.gameDeleteByPlayer = function(req, res) {
    if (req.params.player) {
        Game
            .deleteOne({
                $or: [
                    {p1: req.params.player},
                    {p2: req.params.player}
                ]
            }, function(err) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 204, null);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "Cannot be done without a player"
        })
    }
};

module.exports.gameTakeTurnById = function(req, res) {
    if (!req.params.gameId) {
        sendJsonResponse(res, 404, {
            "message": "Missing game id"
        });
        return;
    } else if (!req.body.pos) {
        sendJsonResponse(res, 404, {
            "message": "Missing board position"
        });
        return;
    }
    Game
        .findById(req.params.gameId)
        .exec(
            function(err, game) {
                if(!game) {
                    sendJsonResponse(res, 404, {
                        "message": "Game id not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                
                var letter = 'X';
                if (game.currentPlayer == game.p2) {
                    var letter = 'O';
                }
                game.board.set(req.body.pos-1, letter);
                
                var currentPlayer = game.p1;
                if (game.currentPlayer == game.p1) {
                    currentPlayer = game.p2;
                } 

                game.currentPlayer = currentPlayer;

                game.save(function(err, game) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, game);
                    }
                });
            }
        );
};