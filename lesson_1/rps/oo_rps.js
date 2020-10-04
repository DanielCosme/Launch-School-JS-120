const readline = require('readline-sync');

function createPlayer(playerType = 'computer') {
  return {
    // player name
    // player current move
    playerType,
    move: null,
    
    choose() {
      if (this.isHuman()) {
        // prompt player 
        let choice;
        
        while (true) {
          console.log('Please choose rock, paper, or scissors: ')
          choice = readline.question();

          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice');
        }

        this.move = choice;
      } 
      else {
        // computer's move
        let move;
        let number = Math.ceil(Math.random() * 3);

        if (number === 1) { move = 'rock' }
        else if (number === 2) { move = 'paper'}
        else move = 'scissors'

        this.move = move;
      }
    },

    isHuman(player) { return playerType === 'human'; },

  };
}

function createMove() {
  return {
    // rock, paper, scissors
  };
}

function createRule() {
  return {

  };
}

let compare = function(move1, move2) {

};

const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, scissors GAME');
  },

  displayGoodbyeMessage() {
    console.log('Good bye and thank you for playing');
  },
  
  play() {
    this.displayWelcomeMessage();
    this.human.choose('human');
    this.computer.choose('computer');
    //displayWinner();
    this.displayGoodbyeMessage();
  },
};


RPSGame.play();
