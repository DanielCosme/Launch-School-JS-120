const readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
    let playerObject = createPlayer();
   
    let computerObject = {
    choose() {
        let move;
        let number = Math.ceil(Math.random() * 3);

        if (number === 1) { move = 'rock' }
        else if (number === 2) { move = 'paper'}
        else move = 'scissors'

        this.move = move;
      }
    }

    return Object.assign(playerObject, computerObject);
}

function createHuman() {
    let playerObject = createPlayer();
    
    let humanObject = {
      choose() {
        // prompt player 
        let choice;
        
        let validChoice = false;
        while (!validChoice) {
          console.log('Please choose rock, paper, or scissors: ')
          choice = readline.question();

          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice');
        }

        this.move = choice;
      },
    }

  return Object.assign(playerObject, humanObject)
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, scissors GAME');
  },

  displayGoodbyeMessage() {
    console.log('Good bye and thank you for playing RPS.');
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
             (humanMove === 'paper' && computerMove === 'scissors') ||
             (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)')
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },
  
  play() {
    this.displayWelcomeMessage();

    let play = true;
    while (play) {
      this.human.choose('human');
      this.computer.choose('computer');
      this.displayWinner();
      if (!this.playAgain()) play = false;
    }

    this.displayGoodbyeMessage();
  },
};


RPSGame.play();
