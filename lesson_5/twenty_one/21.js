const readline = require('readline-sync');
        
class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  static baseDeck = [['ace', 11], ['2', 2], ['3', 3], ['4', 4],
    ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10], ['jack', 10],
    ['queen', 10], ['king', 10],];

  createDeck() {
    this.cards = [];
    for (let i = 0 ; i < 13 ; i++) {
      let current = Deck.baseDeck[i]; 
      this.createCard(current[0], current[1]);
    }
    this.shuffle(this.cards);
  }

  createCard(name, value) {
    for (let i = 0 ; i < 4 ; i++) {
      this.cards.push(new Card(name, value));
    }  
  }

  shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; 
    }
  }

  dealCard() { 
    return this.cards.pop(); 
  }
}

class Card {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Participant {
  constructor() {
    this.score = 0;
    this.money = 5;
    this.hand = [];
  }

  hit(deck) {
    this.getCard(deck.dealCard());
  }

  bust() { 
    return this.score > 21;
  }
  stay() {}

  getCard(card) {
    this.hand.push(card);
    this.score = this.hand.reduce((acc, curr) => {
      return acc += curr.value;
    }, 0);
  }
}

class Player extends Participant {
  constructor() {
    super();
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.keepPlaying = true;
  }


  play() {
    while (this.keepPlaying) {
      this.greeting();
      this.playRounds(); 
      this.displayFinalResult();
      this.playAgain();
      this.reset();
    }

    this.farewell();
  }

  playRounds() {
    while (this.dealer.money !== 0 && this.player.money !== 0) {
      this.round();
      this.deck.createDeck(); // reinitialize deck
      this.displayRoundResult();
      readline.question('Press any button for next round');
      console.clear();
    }
  }

  round() {
    console.log('New Round')
    console.log('Scores: Player', this.player.money, 
      'Dealer', this.dealer.money);
    this.startRound(); // deal cards
    this.playerTurn();
    this.dealerTurn();
    //
    // deal cards for both players from deck
  }

  playerTurn() {
    while (true) {
      this.displayStatus('player');
      let q = 'Do you want another card ? (y/n) ';
      let res = readline.question(q);

      while (!['y', 'n'].includes(res[0])) {
        console.log('invalid choice');
        res = readline.question(q);
      }

      if (res[0] === 'n') break;
      
      this.player.hit(this.deck);

      if (this.player.bust()) { 
        console.log('You loose the round')
        this.player.money -= 1;
        this.dealer.money += 1;
        break;
      }
    }
  };

  dealerTurn() {
    if (this.player.bust()) return;
    console.log('Dealer plays');

    while (true) {
      if (this.dealer.score > 17) break;

      this.displayStatus('dealer'); 
      this.dealer.hit(this.deck);

      if (this.dealer.bust()) {
        console.log('Dealer busts');
        this.player.money += 1;
        this.dealer.money -= 1;
        break;
      }
    }

  };

  displayStatus(participant = 'player') {
    let hide = false;
    if (participant === 'player') hide = true;
    let dealer = this.getParticipantHand(this.dealer, hide);
    let player = this.getParticipantHand(this.player);
    console.log(`\nDealer has: | ${dealer} |`);
    console.log(`Player has: | ${player} | Score: ${this.player.score}`);
    console.log('\n');
  }

  getParticipantHand(parti, hide = false) {
    if ((parti instanceof Dealer) && hide) {
      return parti.hand[0].name;
    }

    return parti.hand.map(card => {
      return card.name;
    }).join(' , ');
  }

  startRound() {
    this.player.hand = [];
    this.dealer.hand = [];
    this.dealCards(this.player, 2);
    this.dealCards(this.dealer, 2);
  } 

  dealCards(participant, num) {
    for (let i = 0 ; i < num ; i++) {
      participant.getCard(this.deck.dealCard());
    }
  }

  reset() {
    this.player.money = 5;
    this.dealer.money = 5;
  }

  displayRoundResult() {
    let res = '';
    if (this.player.bust()) res = 'loose';
    else if (this.dealer.bust()) res = 'win';
    else {
      if (this.dealer.score >= this.player.score) res = 'loose'; 
      else res = 'win';
    }

    console.log(`You ${res} the round`);
  }

  displayFinalResult() { 
    if (this.player.money === 0) console.log('Player Loose the game'); 
    else if (this.dealer.money === 0) console.log('Player Win the game'); 
  }
  
  playAgain() {
    let ques = 'Would you like to play again (y/n)? ';

    let answer = readline.question(ques);
    while (!['y', 'n'].includes(answer[0])) {
      console.log('Invalid answer');
      answer = readline.question(ques);
    }

    if (answer[0] === 'n') this.keepPlaying = false;
  }
  greeting() { 
    console.clear();
    console.log('hello') 
  }
  farewell() { console.log('bye') }
}

let game = new TwentyOneGame();
game.play();

