// app_client/tictactoe
// Created for Lab 8
(function () {
    var app = angular
        .module('blogApp');
    app.service('gameService', game);
    app.controller('GameController', gameController);
        
    // http functions
    function game($http, authentication) {
        // GET
        var getByPlayer = function(player) {
            return $http.get('/api/tictactoe/' + player);
        };    
        
        // POST
        var createByPlayers = function(p1, p2) {
            return $http.post('/api/tictactoe/', {"p1": p1, "p2": p2}, {headers: {Authorization: 'Bearer ' + authentication.getToken()}});
        };

        // DELETE
        var deleteByPlayer = function(player) {
            return $http.delete('/api/tictactoe/' + player, {headers: {Authorization: 'Bearer ' + authentication.getToken()}});
        };

        // PUT
        // pos: position on board
        var takeTurnById = function(gameId, pos) {
            return $http.put('/api/tictactoe/' + gameId, {"pos": pos},  {headers: {Authorization: 'Bearer ' + authentication.getToken()}});
        };

        return {
            getByPlayer: getByPlayer,
            createByPlayers: createByPlayers,
            deleteByPlayer: deleteByPlayer,
            takeTurnById: takeTurnById
        };
    }

    function gameController(authentication, $interval, $scope, gameService) {
        var vm = this;
        vm.winner = '';
        vm.gameOver = false;
        vm.pageHeader = {
            title: 'Tic Tac Toe'
        };

        // gets a game by a player
        gameService.getByPlayer(authentication.currentUser().email)
            .then(
                function successCb(response) {
                    vm.board = response.data;
                    vm.gameOver = vm.checkGame();
                },
                function errorCb(err) {
                    vm.board = null;
                    vm.gameOver = false;
                    vm.winner = '';
                }
            );

        // calls something at an interval        
        $scope.callAtInterval = function() {
            gameService.getByPlayer(authentication.currentUser().email)
            .then(
                function successCb(response) {
                    vm.board = response.data;
                    vm.gameOver = vm.checkGame();
                },
                function errorCb(err) {
                    vm.board = null;
                }
            );
        };
        $interval(function() { $scope.callAtInterval(); }, 3000, 0, true);

        vm.takeTurn = function(pos) {
            console.log(authentication.currentUser().email);
            if (authentication.currentUser().email != vm.board.currentPlayer) {
                return;
            }
            if (vm.board.board[pos] != '') {
                return;
            }
            if (vm.gameOver) {
                return;
            }
            gameService.takeTurnById(vm.board._id, pos + 1)
                .then(
                    function successCb(response) {
                        console.log(response);
                        vm.board = response.data;
                        vm.gameOver = vm.checkGame();
                    },
                    function errorCb(err) {
                        console.log = "Error occoured while taking turn";
                    }
                );
        }
        
        // check if game is over
        vm.checkGame = function() {
            vm.winner = '';
            
            if (vm.board.board[0] == vm.board.board[1] && vm.board.board[0] == vm.board.board[2]) {
                if (vm.board.board[0] != '') {
                    vm.winner = vm.board.board[0];
                    return true;
                }
            } else if (vm.board.board[3] == vm.board.board[4] && vm.board.board[3] == vm.board.board[5]) {
                if (vm.board.board[3] != '') {
                    vm.winner = vm.board.board[3];
                    return true;
                }
            } else if (vm.board.board[6] == vm.board.board[7] && vm.board.board[6] == vm.board.board[8]) {
                if (vm.board.board[6] != '') {
                    vm.winner = vm.board.board[6];
                    return true;
                }
            } else if (vm.board.board[0] == vm.board.board[3] && vm.board.board[0] == vm.board.board[6]) {
                if (vm.board.board[0] != '') {
                    vm.winner = vm.board.board[0];
                    return true;
                }
            } else if (vm.board.board[1] == vm.board.board[4] && vm.board.board[1] == vm.board.board[7]) {
                if (vm.board.board[1] != '') {
                    vm.winner = vm.board.board[1];
                    return true;
                }
            } else if (vm.board.board[2] == vm.board.board[5] && vm.board.board[2] == vm.board.board[8]) {
                if (vm.board.board[2] != '') {
                    vm.winner = vm.board.board[2];
                    return true;
                }
            } else if (vm.board.board[0] == vm.board.board[4] && vm.board.board[0] == vm.board.board[8]) {
                if (vm.board.board[0] != '') {
                    vm.winner = vm.board.board[0];
                    return true;
                }
            } else if (vm.board.board[2] == vm.board.board[4] && vm.board.board[2] == vm.board.board[6]) {
                if (vm.board.board[2] != '') {
                    vm.winner = vm.board.board[2];
                    return true;
                }
            }
            // checks for a draw
            var filled = 0;
            for (i = 0; i < 9; i++) {
                if (vm.board.board[i] != '') {
                    filled++;
                }
            }
            
            if (filled == 9) {
                return true;
            }
            
            return false;   
        };

        // quit game befor it ends
        vm.quitGame = function() {
            gameService.deleteByPlayer(authentication.currentUser().email)
                .then(
                    function successCb(response) {
                        vm.board = null;
                        vm.winner = '';
                        vm.email = '';
                        vm.gameOver = false;
                    },
                    function errorCb(err) {
                        console.log("Error quitting game");
                    }
                );
        };

        vm.startGame = function(){
            if (!vm.email) {
                return false;
            } else {
                authentication.isUser(vm.email)
                    .then(
                        function successCb(response) {
                            if (response.data.isUser) {
                                gameService.getByPlayer(vm.email)
                                    .then(
                                        function successCb(response) {
                                            console.log("User is in another game");
                                        },
                                        function errorCb(err) {
                                            gameService.createByPlayers(authentication.currentUser().email, vm.email)
                                                .then(
                                                    function successCb(response) {
                                                        vm.board = response.data;
                                                    },
                                                    function errorCb(err) {
                                                        console.log("Could not start game", err);
                                                    }
                                                )
                                        }
                                    )
                            }
                        },
                        function errorCb(err) {
                            console.log(err);
                        }
                    )
            }
        };
    }
      
})();