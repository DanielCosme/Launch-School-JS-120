let cat = {
  name: 'Pudding',
  colors: 'black and white',
  identify() {
    let report = function() {
      console.log(`${this.name} is a ${this.colors} cat.`);
    };
    report();
  },
};

cat.identify();
// Expected output: Pudding is black and white.
