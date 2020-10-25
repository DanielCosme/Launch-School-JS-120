// Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named Auto and Motorcycle to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named WheeledVehicle. Their code, thus far, looks like this:

const FueledVehicle = {
  range() {
    return this.fuelCap * this.fuelEfficiency;
  },
}

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

Object.assign(WheeledVehicle.prototype, FueledVehicle);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

Object.assign(Catamaran.prototype, FueledVehicle);

let cat = new Catamaran(2, 4, 50, 120);
console.log(cat.range());
let auto = new Auto();
console.log(auto.range());

