// Implement an ancestors method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:
//

// name property added to make objects easier to identify
let foo = {
  name: 'foo',
  ancestors: function() {
    let current = this;
    let ret = [];

    while (true) {
      if (Object.getPrototypeOf(current) === null) break;

      current = Object.getPrototypeOf(current);

      if (current.name) ret.push(current.name);
      else ret.push('Object.prototype');
    }

    console.log(ret);
  }
};

let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']


