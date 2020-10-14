// Consider the following classes:
// Refactor these classes so they all use a common superclass, and inherit behavior as needed.
//

class Vehicle {
  constructor(make, model, wheels = 4) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}


class Car extends Vehicle {
  constructor(make, model) {
    super(make, model);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6)
    this.payload = payload;
  }
}

let car = new Car('tesla', 2020);
console.log(car.info());
console.log('Car wheels', car.wheels);

let moto = new Motorcycle('ducati', 1999);
console.log(moto.info());
console.log('Moto wheels', moto.wheels);

let truck = new Truck('Volvo', 2009, 20);
console.log(truck.info());
console.log('truck wheels', truck.wheels);
console.log('truck payload', truck.payload);

