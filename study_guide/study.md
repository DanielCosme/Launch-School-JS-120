# pJS-129 Written assessment Doc

# Top level: Object Oriented Programming

## Objects
### What are objects?
#### Concept 
An object is the basic unit in which OO programs organize and put together related state and 
behavior. Objects are usually represented or modeled after real world entities (nouns).

Generally speaking an Object is an instance of a Class. A class is the blueprint that is used
to instantiate Objects, however different languages have different implementations in terms of
object creation and/or instantiation. In JavaScript Objects inherit desired states and behavior
from other objects as opposed to classes.

#### Meaning of the concept in the context of JavaScript

Objects are one of the fundamental types in JavaScript.

They are first and foremost data structures that hold `{key, value}` pairs, where the keys are 
always `strings` and the **values** can be of any type/value.

JavaScript builds on top of this data structure in order to be able to write object oriented 
programs and create more sophisticated data types. JS does this by adding some characteristics, functionality and specific methods in 
`Object.prototype` in order to allow programmers to write object oriented programs.

An example of how to create an object in JavaScript:
```javascript
{} // this is an object literal
const obj = {}; 
const obj2 = new Object(); // created using the new keyword
console.log(obj, obj2);
const obj3 = Object.create({}); // 
// const obj4 = factoryFunction()
// const obj5 = Object.create({}).init(); // OLOO
```
#### Object Factories 
Functions that have the specific purpose of creating other objects. This functions
return objects, and take as input the desired state. They are part of **Object Creation patterns**

**Pro:**
The problem they solve is the creation of objects that are the same type, by type
I mean objects with the same state and behavior. 

Also of course *code reuse*.

**Con:**
All objects created by the factory will have their behaviors (methods) duplicated in memory,
creating code duplication in memory. This happens because each object will have its own version
of the method, this is wasteful in terms of memory utilization.

Other con is the fact that there is no way of relating objects created by the same factory. It is 
not possible to determine the type of the object after its instantiation.

```javascript
const person = function(name, location) {
  let getInfo = function() {
    console.log(this.name, this.location);
  }
  return {
    name,
    location,
    getInfo,
  } 
}
let per1 = person('Daniel', 'Montreal');
let per2 = person('Laura', 'Bogota');
fac.getInfo();
fac2.getInfo();
```
#### Constructors
A special type of function whose purpose is the creation of objects. It has several differences
with the object factories.

First of all, a constructor function is invoked using the `new` keyword, and its expected to return and object from the function. They are capitalized by convention. Example:
```javascript
let arr = new Array(); // Array is the constructor.
```
One advantage of creating objects with the constructor and the `new` keyword is that newly crated 
objects can be identified by their type. This is possible because newly created objects from a 
constructor function will by default contain a constructor property in their prototype object. The
way we do this type checking is by using the `instanceof` operator in an expression which will 
evaluate to `true` of `false` depending if the operators are related. Example: 

```javascript
function Person(name) {
  this.name = name;
}

let dan = new Person('Daniel');
console.log('Is daniel a (of type) person?', dan instanceof Person); // true
console.log('Is daniel a person?', Object.GetPrototypeof(dan).constructor === Person); // true
```
**Characteristics**
- you can explicitly return an object form a constructor.
- you cannot explicitly return a primitive from a constructor.

#### Prototypes
A ``[[Protoype]]`` is a private property of every object in JavaScript. It is used to 
look for missing properties and methods in objects, this lookup mechanism is called looking
up into the prototypal chain.

Prototypes serve as the cornerstone of implementing inheritance in JavaScript.

- They way to access this property is by using `Object.getPrototypeOf()`.
- Relations in the protorypal chain can be cheeked using `Object.isPrototypeOf()`;
- Objects can be assigned its prototype at creation by `Object.create()`
- Objects by default will have `Object.prototype` as their prototype.
- Prototypes can be assigned manually via `Object.setProtorypeOf()`.

Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower down in the chain inherit properties and behaviors from objects in the chain above. That is, downstream objects can delegate properties or behaviors to upstream objects.

- A downstream object shadows an inherited property if it has a property with the same name.
- `Object.getOwnPropertyNames` and `obj.hasOwnProperty` can be used to test whether an object owns a given property.

```javascript
let ojb = { hello() {console.log('hello', this.name)} };
let obj = Object.create(ojb);
obj.name = 'daniel';
obj.hello();
Object.getPrototypeOf(obj); // true
ojb.isPrototypeOf(obj); // true
Object.getOwnPropertyNames(obj);
```

### OLOO
**Object Creation pattern**
Refers to objects linking to other objects. Is a object creation pattern in which objects are  
created from a prototype Object, meaning objects from the same type will now delegate method 
invocation to their prototype and if not possible up into to prototypal chain.

This pattern improves upon the factory method in terms of performance, now each new object will have
unique state but shared behavior via their prototype.

In this pattern, inheritance relations between objects are manually assigned with the `Object.create()`
method at the time of instantiation.

**Characteristics**

- The way that state is initialized is with a `init()` method, that is called at 
  creation after using `Object.create()`.
- The init method, must return the invoking object, otherwise It will loose its 
  handle, it will get garbage collected and it will not be saved into a variable as expected.
- This pattern creation solves the problem of code reuse and memory efficiency by method delegation to a prototype.
- Each time inheritance is to be implemented via OLOO the method `Objec.setPrototypeOf()` can be used to create a prototypal chain.
- The way to check for relations in the prototypal chain is by using the instance method`obj.isPrototypeOf()`.

```javascript
const Person = {
  init(name, location, gender) {
    this.name = name;
    this.location = location;
    this.g = gender;
    return this;
  },

  show() { console.log(`My name is ${this.name}, and I live in ${this.location}.`)},
  gender() { console.log('My gender is:', this.g)},
}

const Male = {
  init(name, location) {
    Person.init.call(this, name, location, 'Male');
    return this;
  }
}

Object.setPrototypeOf(Male, Person);

let daniel = Object.create(Male).init('Daniel', 'Montreal');
daniel.show();
daniel.gender();

let lau = Object.create(Person).init('lau', 'Laval', 'Female');
lau.show();
lau.gender();
```

### ES6 classes

ES6 classes are nothing more than syntactical sugar added on top of the prototypal inheritance
pattern based on constructors and prototypes.

Underneath the hood they act in the same fashion. The main objective of ES6 Classes is to provide
easier transition for programmers coming from Object Oriented languages like Java or C# by making
the syntax more familiar.

Their only difference is that of syntax. 

- The `class` keyword is added in replacement of a constructor function definition.
This is how a class is defined `class Person {}`.
- Inside the body of the class (the brackets) there is an instance method called `constructor`, this
constructor will hold all of the state initialization code, if the class is a sub-type/sub-class, the
parent constructor need to be called with the keyword `super()`, this will call the parent constructor, it needs to be the first line in the constructor method.
- On the rest of the body the desired behavior will be implemented, parent methods can be overridden, and some of them **must** in order to provide functionality, like for example: `toStrig()`, this method by default will give no meaningful information of Objects.
- Inheritance is implemented by the keyword `extend` which you use when you want to establish a 
prototypal relationship with two "classes".


```javascript
class Person {
  constructor(name, location, gender) {
    this.name = name;
    this.location = location;
    this.gender = gender;
  }

  info() {
    console.log(`My name is ${this.name}, I live in ${this.location} and I am a ${this.gender}`);
  }
}

class Male extends Person {
  constructor(name, location) {
    super(name, location, 'Male');
  }
}

let daniel = new Male('Daniel', 'Montreal');
let lau = new Person('Lau', 'Laval' , 'Female');
daniel.info();
lau.info();

```

### Methods and properties

The topic of methods and properties pertain on how they behave are accessed and defined in objects. 
In the context of JavaScript this is very important when writing Object Oriented programs due to 
the several ways that exist in the language to write OO code.

There are two types of members that can be used with objects:
- Instance members
- Static members

In generic terms **instance members** (methods & properties) of an object are ones that can be accessed
or invoked directly by the object itself, like for example:

```javascript
let arr = [1, 2];
arr.push(3); // instance method.
console.log(arr);
```
The `push` *instance* method of `arr` is invoked from the array object. An instance property can be
accessed in the same fashion like so `arr.length`, returning the length property of the array. 
Members up in the prototypal chain are also considered instance members, even if there is method
delegation. *Instance* properties are always those that are unique to the object they belong to.
generally speaking instance methods are those who in some way might change the state of the object.

**Static* members of an object are very specific to the pseudo-classical approach to writing OO code.
Static members are those whose state is common for all instances of that particular object at all times.
They are accessed and invoked by referencing the constructor/class directly, for example:
```javascript 
Array.isArray(); // static method.
```
Generally speaking static methods are those who don't mutate the state of the object.


### Prototypal and pseudo-classical inheritance 
Before talking about the two different methods of implementing inheritance in JS is 
important to talk about inheritance as a concept, separated from the JavaScript context.

**Inheritance** is one of the 3 pillars of Object Oriented Programming. There are two main 
objectives of inheritance:
- Code reuse.
- Extensibility.

Inheritance is a pattern that allows for the creation of types that share code and behavior among
them, this creates a hierarchy or chain of relations between them. The process of a type inheriting 
state and behavior from another is called sub-typing. Not only types can inherit form other types,
they can modify or enhance to their behavior by adding their own and overriding current ones.

#### Prototypal 
Its how JavaScript implements inheritance in JavaScript. It makes use of the protoype property that 
all objects have in the language in order to share state and behavior with many objects of the same
type.

There are two patterns that are used in JavaScript in order to achieve inheritance, both patterns
make use of prototypes, however they have differences in how they create objects and express 
relations between them.

##### Prototypal pattern
When creating an object, the object will be created from a prototype object from which it will 
inherit all of its behaviors.

The way this is achieved is by first creating a prototype object. Then the desired object to 
be created is created directly from the prototype, meaning the new object will inherit all of
it properties from it. 

```javascript
const Person = {
  greet() { console.log('Hello my name is', this.name) },
}

let p1 = Object.create(Person);
p1.name = 'Daniel';
p1.greet();
// To check for relations between objects and prototypes this methods are used:
Person.isPrototypeOf(p1); // true --- checks if p1 is a PERSON.
Object.getPrototypeOf(p1); // { greet() {....} } --- gets p1 prototype.

const Male = {}
Object.setPrototypeOf(Male, Person);

let p2 = Object.create(Male);
p2.name = "Sergio";
p2.greet();
Person.isPrototypeOf(p2); // true --- checks if p1 is a PERSON.
```
State is create in new objects by using the OLOO creation pattern discussed above.

#### Pseudo-classical 
This pattern uses a `constructor` function that is invoked using the `new` keyword in order
to create objects, meaning that objects are creating from a constructor function. This 
function uses its `prototype` property (unique to function objects) in order to create the
hierarchical relation between objects, or in other words to implement inheritance. The newly
created object will have its private `[[Prototype]]` (`__proto__`) property point (reference) to
the prototype object in the constructor function.

The way sub-classing works is by calling super class constructor on the subclass and assigning the
returned object to the current object, this is for state. To inherit behavior the `[[Prototype]]` of 
the prototype object in the constructor function needs to be pointing to the super class prototype
property.

### Encapsulation
**Second** pillar of Object Oriented Programming.
Is the programming practice of putting together related state and behavior into an entity. 
Encapsulation is done in order to:
- More effectively maintain code.
- Enable access restriction from outside code to properties of the object, data hiding.
- Makes it easier to reason about the problem at hand.
- Encourages decoupling.

### Polymorphism
**Third** pillar of Object Oriented Programming.
The ability of being able to invoke code while being indifferent from its type and/or implementation.
Polymorphism only concerns with the interface being used to invoke code, not its type or particular
implementation, meaning that calling code will only concern with the presence of the expected 
behavior, in most cases it is all about the presence of a method.

There are two ways to enable the use of polymorphism:
- Inheritance (sub-classing).
- Composition (composition).

With *inheritance* different objects get the related behavior, but the implementation might differ, 
nevertheless the invoking code will agnostic to it, it will only look for the expected interface.
Is about invoking code on objects of different types that are related to one another via inheritance.

```javascript
class Entity {
  constructor(name) {
    this.name = name;
  }
  move() { console.log('I move like a', this.constructor.name); }
}

class Human extends Entity {}

class Robot extends Entity {}

let rob = new Robot('willie');
let hum = new Human('daniel');
let ent = new Entity('entity');

const arr = [rob, hum, ent];

function moveEntities(entity) {
  entity.move();
}

arr.forEach(moveEntities);

```
**Ducktyping**
Is about invoking code on objects of different types that are related to one another via composition
or the presence of a common behavior.

```javascript
class Person { }
class Robot { }
const moveInterface = {
  move() { console.log(this.constructor.name) }
}

let p = new Person();
Object.assign(p, moveInterface);
let r = new Robot();
Object.assign(r, moveInterface);

p.move();
r.move();
```

### Collaborator objects
Collaborator objects are any property in an object used in order to *store state*, they can be 
objects as well as primitives.

```javascript
const Person = {
  name: 'Daniel',
  address: {
    streetName: 'av Brien',
    // zip code
    // etc
  },
}
```

### Single vs multiple inheritance
In some Object Oriented languages an object can inherit properties from multiple parent chains
of ancestry. JavaScript is single inheritance only, meaning multiple inheritance is not 
supported.

In the case of JavaScript this means the presence of only one prototype object.

### Mix-ins; mix-ins vs. inheritance
Pattern.
A mix-in is an Object whose main purpose is to add additional functionality to other objects by 
composition, meaning a "has-a" relationship as opposed to a "is-a" relationship (Inheritance).
This is implemented just by using the `Object.assign()` method in order to transfer the desired
properties to the new object.

Share behavior between seemingly unrelated classes.


### Methods and functions; method invocation vs. function invocation
In JavaScript there are more than two ways of invoking functions and methods, this is important 
because of the nature of the `this` keyword; its value will vary depending on how a function or 
method is invoked.

Because of the first-class nature of functions in JavaScript a method defined within an object, 
can be referenced from an outside variable and invoked as a function.

There are 4 ways of invoking functions/methods in JavaScript.

- **Constructor** functions using the `new` keyword `let foo = new Array();`
- **Method invocation** like so `array.push(element)` 
- **Binding** like so `array.call(context, element)`
- Regular **function invocation** `func() {} func();`

It is important to highlight the fact that any function/method at any given time could be invoked
with any of the 4 mechanisms, and that will have an impact on the execution context within the 
function body.

 ```javascript
 function greet() {
  console.log(this.name);
 }

 name = 'Global Object';

 let obj = {
  name: 'Daniel',
 };

 let obj2 = { name: 'Laura' };

 obj.greet = greet;

 obj.greet(); // method invocation.
 greet(); // function invocation.
 greet.apply(obj2); // bind function invocation.
 obj.greet.apply(obj2) // bind method invocation.
 let a = new greet() // constructor function invocation.
 ```

### Higher-order functions
Higher order functions are functions that can do one of the following:
- Take functions as arguments.
- Return other functions.

They don't need to be able to do both to be considered higher order functions, just one.

### The global object
Is an object that acts as the implicit execution context at any given time within function 
invocations. This global object have its properties accessible from any part of the program,
meaning all of its members are globally accessible, in other words they live in the global scope.
All variables defined with the `var` keyword are to become members of the global object.

### Method and property lookup sequence
When a property or method is attempted to be acceded from within an object and it is not found,
JavaScript will start to look for it on the `[[Prototype]]` object. The lookup sequence represents
the order in which the member is going to be searched on the prototypal chain. The lookup will stop
if the member is found.

### Function execution context and this
Function execution context represents the reference to which the `this` keyword points to
within the body of a function/method, this reference is always meant to be an object.
The default execution context for functions in JavaScript is the `global object`. The function
execution context is resolved by how the function was invoked, as seen on the function/method
invocation mechanisms.

One exception to this rule is when a function that is defined with the arrow function syntax is 
invoked, its execution context is permanently bind to the execution context in its outer lexical
scope.

       Execution context resolves to something (an object), always. 

### Implicit and explicit execution context
There are two ways for execution context to be resolved, Implicit and explicit.

#### Implicit
In a **Method invocation** the execution context will resolve to the invoking object.
```javascript
let obj = {
  name: 'Daniel',
  greet() { console.log('Hello my name is,', this.name) },
}

obj.greet();  // logs ... my name is, Daniel.
// this evaluates to the invoking method
```
In a **Function invocation** the execution context will resolve to the global object by default.
```javascript 
greet() { console.log('Hello my name is,', this.name) },

greet(); // logs undefined because there is no name property on the global object 
name = 'Daniel';
greet(); // logs Daniel.
```
Functions/methods that are defined with the arrow function syntax will permanently bind their 
execution context to that from their outer scope.

#### Explicit
This is where the programmer indicates "manually" (Bind) what is going to be the execution context of a
function, or in other words to what object will `this` reference.

There are 4 ways of setting the execution context explicitly.
The first 3 are function object methods: 

- `apply`.
- `call`.
- `bind`.

```javascript
function greet(other, o) {
  console.log('Hello my name is', this.name , "and I live in" , this.location);
  console.log('I like', other, "and", o);
}

function Person(name, location) {
  this.name = name;
  this.location = location;
}

let obj = new Person('Daniel', 'Montreal');
let obj2 = new Person('Laura', 'Laval');
let obj3 = new Person('Beck', 'Toronto');

greet.call(obj, 'Computers', "Girls"); // call
greet.apply(obj2, ['Makeup', 'Telenovelas']); // apply
let func = greet.bind(obj3); // bind, returns a new function.
func('Vans', 'Eamon');
```

The remaining one is with the `new` keyword used with constructors. When a function is invoked with 
`new`, the execution context will be a new object that eventually will get returned by the constructor.

### Dealing with context loss
There are 3 cases in which a function will loose its desired execution context:
- Methods copied from an object.
- Functions passed into higher-order functions as arguments.
- Nested functions (A function defined inside a function).

**Strats for context loss when passing functions to other function**

- Preserve context with a variable in outer context.
- Arrow function.
- Use the `thisArg` (Only on some functions).
- Bind the function when passing it as argument.


**Methods copied from an object**
When a method is copied into a value and invoked as a function, it will no longer have the object
as context. 

There are two ways of avoiding this, the first one is to explicitly bind the context to the object
when the method is invoked.

Bind when passing into function.
Call when needed to execute right away.

```javascript
let obj = {
  name: 'Daniel',
  greet() { console.log(this.name) },
}

let func = obj.greet;
func();
func.apply(obj);
```
```javascript
let obj = {
  name: 'Daniel',
}

obj.greet = (function() { console.log(this.name) }).bind(obj);

let func = obj.greet;
func();
```
Bind is generally useful when you need to save the method for later use or to pass into a function.
Call or apply are generally good when you will execute/invoke the function right away.

One disadvantage with bind is that once you use a bound function it will no longer be possible to
determine the context just by looking at the invocation.

**Nested functions**
When a function is nested within another, the context can get lost when invoking it.
One strategy is to bound the context to the outer scope like so:

```javascript
function func() {
  let self = this;
  function() {
    console.log(self.name);
  }()
}
func.apply({ name: 'Daniel'});
```
Other strategy is to bind the function with the bind method.
The last strategy is to provide the context when calling the inner function.
Also use arrow functions.

### Object.assign 
Is an Object static method that copies the own properties of an Object to another.
### Object.create
Is an Object static method that creates a new object and sets is prototype to the object received as
argument by it.
### Built-in constructors 
We are going to explore the behaviors of the built in constructors when invoked with and
without the `new` keyword.
#### Array
Array is one of the fundamental data structures in JavaScript.
Array is also an function object and that means it is a constructor, so we can do the following:
```javascript
let arr = new Array(); // []
let arr2 = Array(); // []
```
Both function invocations will return a new array no matter if they where invoked with or without
the `new` keyword.
#### Object 
When an object is called with a non-constructor context it will behave exactly as if it would've
been called with the `new` keyword.
#### String 
When called with constructor context it will return an Object, a wrapper.
When called without constructo contect it will convert the input into a string, thus, returning a 
string (primitive type).
#### Number
For numbers it works in the same way as for Strings.
### Reading OO code

### How is the term variable used
#### Why are the following treated as variables
- Variables declared with `let`, `const`.
- Function parameters.
- Function names.
- Class names.
#### Object property names are not variables (why not)



##### Daniel Cosme 02/11/20
