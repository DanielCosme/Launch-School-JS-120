const readline = require('readline-sync');

function Square(marker = Square.EMPTY) {
  this.marker = marker;
}

Square.EMPTY = ' ';
Square.EX = 'X';
Square.CIRCLE = 'O';

Square.prototype.toString = function() { return this.marker }
Square.prototype.setMarker = function(marker) { this.marker = marker }
Square.prototype.getMarker = function() { return this.marker }
Square.prototype.isUnUsed = function() { 
  return this.marker === Square.EMPTY 
}

function Board() {
  this.squares = {};
  for (let count = 1; count <= 9; count++) {
    this.squares[String(count)] = new Square();
  }
}

Board.prototype.unUsedSquares = function() {
  let keys = Object.keys(this.squares);
  return keys.filter(key => this.squares[key].isUnUsed());
}

Board.prototype.draw = function() {
  console.log("");
  console.log("     |     |");
  console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
  console.log("     |     |");
  console.log("");
}

Board.prototype.markSquareAt = function(key, marker) {
  this.squares[key].setMarker(marker);
}

Board.prototype.countMarkersFor = function(player, keys) {
  let markers = keys.filter(key => {
    return this.squares[key].getMarker() === player.getMarker();
  });

  return markers.length;
}

function Player(marker) {
  this.marker = marker;
}

Player.prototype.getMarker = function() { return this.marker }

function Human(marker) {
  Object.assign(this, new Player(marker));
}

Human.prototype = Object.create(Player.prototype);
Human.prototype.move = function(board) {
  let choice;

  while (true) {
    let validChoices = board.unUsedSquares();
    const prompt = `Choose a square (${validChoices.join(", ")}): `;
    choice = readline.question(prompt);

    if (validChoices.includes(choice)) {
      break;
    }

    console.log('Sorry, that\'s not a valid choice.');
    console.log('');
  }

  return choice;
}

Human.prototype.constructor = Human;

function Computer(marker) {
  Object.assign(this, new Player(marker))
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;
Computer.prototype.move = function() {
  let res =  Math.floor((9 * Math.random()) + 1);
  return res;
}

function TTTGame() {
  this.player2 = new Computer(Square.CIRCLE);
  this.player1 = new Human(Square.EX);
  this.board = new Board();
  this.winner = null;
}


TTTGame.prototype = {
  displayGreeting() { console.log('Welcome to the game.', '\n') },

  displayFarewell() { console.log('Thanks for playing, bye.') },

  gameOver() { return this.boardIsFull() || this.someoneWon() },

  boardIsFull() { return this.board.unUsedSquares().length === 0 },

  someoneWon() {
    return this.isWinner(this.player1) || this.isWinner(this.player2);
  },

  displayResult() {
    if (this.isWinner(this.player1)) {
      console.log("You Won Congratulations!");
    } else if (this.isWinner(this.player2)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }

    this.board.draw();
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },

  firstPlayerMoves() { this.playerMoves(this.player1) },

  secondPlayerMoves() { this.playerMoves(this.player2) },

  playerMoves(player) {
    console.log(player.constructor.name, 'Moves');
    let key = player.move(this.board);

    while (this.board.squares[key].toString() !== Square.EMPTY) {
      key = player.move();
    }

    this.board.markSquareAt(key, player.getMarker());
  },

  play() {
    this.displayGreeting();
    while (true) {

      this.board.draw();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
      console.clear();
    }
    console.clear();

    this.displayResult();
    this.displayFarewell();
  },
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  [ "1", "2", "3" ],            // top row of board
  [ "4", "5", "6" ],            // center row of board
  [ "7", "8", "9" ],            // bottom row of board
  [ "1", "4", "7" ],            // left column of board
  [ "2", "5", "8" ],            // middle column of board
  [ "3", "6", "9" ],            // right column of board
  [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
  [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
];

let game = new TTTGame();
game.play();

