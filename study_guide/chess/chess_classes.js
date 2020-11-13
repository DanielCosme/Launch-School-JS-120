function log(str) {
  console.log(str);
}

class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

const movable = {
  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
    log(`${this.constructor.name} Moving to ${x},${y}`);
  }
}

class Entity {
  constructor(pos = {x:0, y:0}) {
    this.position = new Position(pos.x, pos.y); // private.
    Entity.entities.push(this);
  }

  static entities = [];
}

class Character extends Entity {
  constructor(hp = 100, attack = 10) {
    super();
    this.hp = hp;
    this.attackValue = attack;
    Object.assign(this, movable);
  }

  attack(char) {
    let me = this.constructor.name;
    let him = char.constructor.name;
    char.hp -= this.attackValue;
    log(`${me} Attacking ${him}, hitpoints left ${char.hp}`)
  }
}

class Player extends Character {
  constructor() {
    super(300, 20);
  }
}

class NPC extends Character {
  constructor() {
    super();
  }
  // Ai behavior
}

const player = new Player();
const foe = new NPC();
foe.attack(player);
player.attack(foe);

foe.moveTo(23, 49);
player.moveTo(35, 45);

log(player instanceof Entity);
log(foe instanceof Entity);

log(Entity.entities);
