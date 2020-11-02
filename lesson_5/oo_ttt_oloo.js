const readline = require('readline-sync');

const Square = {
  EMPTY : ' ',
  EX : 'X',
  CIRCLE : 'O',

  init(marker = Square.EMPTY) {
    this.marker = marker;
    return this;
  },

  toString() { return this.marker },

  setMarker(marker) {
    this.marker = marker;
  },

  getMarker() { return this.marker },

  isUnUsed() { return this.marker === Square.EMPTY },
}

const Board = {

  init() {
    this.squares = {};
    for (let count = 1; count <= 9; count++) {
      this.squares[String(count)] = Object.create(Square).init();
    }
    return this;
  },

  unUsedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnUsed());
  },

  draw() {
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
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  },
}

const Player = {
  init(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() { return this.marker },
}

const Human = Object.create(Player);
Object.assign(Human, {
  move(board) {
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
  },
});

const Computer = Object.create(Player);
Object.assign(Computer, {
  move() {
    let res =  Math.floor((9 * Math.random()) + 1);
    return res;
  },
});

const TTTGame = {
  init() {
    this.player2 = Object.create(Computer).init(Square.CIRCLE);
    this.player1 = Object.create(Human).init(Square.EX);
    this.board = Object.create(Board).init();
    this.winner = null;
    return this;
  },

  POSSIBLE_WINNING_ROWS : [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ],

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

let game = Object.create(TTTGame).init();
game.play();

