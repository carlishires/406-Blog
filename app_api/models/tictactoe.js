// app_api/models
// Created for Lab 8
var mongoose = require('mongoose');

var tictactoeSchema = new mongoose.Schema({
    board: {
        type: [String],
        "default": ['', '', '', '', '', '', '', '', ''],
        required: true
    },
    p1: {type: String, required: true},
    p2: {type: String, required: true},
    currentPlayer: {type: String, required: true}
});

mongoose.model('Game', tictactoeSchema);