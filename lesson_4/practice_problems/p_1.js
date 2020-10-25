const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

function can(vehicle) {
  if ('goFast' in vehicle) {
    vehicle.goFast();
  } else {
    console.log(vehicle.constructor.name + ' cannot go fast');
  }
}

// make a vehicle go fast.
 
let car = new Car();
let truck = new Truck();

can(car);
can(truck);

