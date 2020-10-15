// In JavaScript, comparing two objects either with == or === checks for object identity. In other words, the comparison evaluates to true if it's the same object on either side of == or ===. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false


function objectsEqual(one, two) {
  let keysOne = Object.keys(one).sort(); 
  let keysTwo = Object.keys(two).sort();

  if (keysOne.length !== keysTwo.length) return false;

  for (let i = 0 ; i < keysOne.length ; i++) {
    let keyOne = keysOne[i];
    let keyTwo = keysTwo[i];

    if (keyOne !== keyTwo) return false;
  }

  return true;
}

console.log(Object.getOwnPropertyNames({ a: 2, b: 3, c: -1}));

