class Cat {
  constructor(n) {
    this.name = n;
  }

  greet() {
    console.log('Hello my name is', this.name);
  }
}
    
let kitty = new Cat('Sophie');
kitty.greet();
