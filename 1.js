function func() {
  (function() {
    console.log(this.name);
  }).apply(this);
}

let obj = { 
  name: 'Daniel',
  greet: 
};

obj.greet();
