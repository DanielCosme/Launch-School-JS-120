function log(s) {
  console.log(s);
}

function Position(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const movable = {
  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
    log(`${this.constructor.name} Moving to ${x},${y}`);
  }
}

function Entity( pos = {x:0, y:0}) {
  this.position = new Position(pos.x, pos.y);
  Entity.entities.push(this);
}

Entity.entities = [];

function Character(hp = 100, attack = 10) {
  Entity.call(this);
  this.hp = hp;
  this.attackValue = attack;
  Object.assign(this, movable);
}

Object.setPrototypeOf(Character.prototype, Entity.prototype);
Character.prototype.attack = function(char) { 
    let me = this.constructor.name; let him = char.constructor.name;
    char.hp -= this.attackValue;
    log(`${me} Attacking ${him}, hitpoints left ${char.hp}`)
  }

function Player() {
  Character.call(this, 300, 20);
}

// Object.setPrototypeOf(Player.prototype, Character.prototype);
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

function NPC() {
  Character.call(this);
}

Object.setPrototypeOf(NPC.prototype, Character.prototype);

const player = new Player();
const foe = new NPC();
log(player.constructor);
log(foe.constructor);
foe.attack(player);
player.attack(foe);
log(player instanceof Player);
log(foe instanceof Entity);

foe.moveTo(23, 49);
player.moveTo(35, 45);
log(Entity.entities);
