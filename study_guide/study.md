# JS-129 Written assessment Doc

Topics are going to be explored in a hierarchy. The a OOP concept is going to be
explored and then the language specific (JavaScript) way of doing it. 

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
    this.gender = gender;
    return this;
  },

  show() { console.log(`My name is ${this.name}, and I live in ${this.location}.`)},
  gender() { console.log('My gender is:', this.gender)},
}

const Male = {
  init(name, location) {
    Person.init.call(name, location, 'Male');
  }
}
Object.setPrototypeOf(Male, Person);

let daniel = Object.create(Male).init('Daniel', 'Montreal');
daniel.show();
daniel.gender();

let lau = Object.create(Person).init('lau', 'Laval', 'Female');
lau.show();
daniel.gender();
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

*Inheritance* is one of the 3 pillars of Object Oriented Programming. There are two main 
objectives of inheritance:
- Code reuse
- Extensibility

Inheritance is a pattern that allows for the creation of types that share code and behavior among
them, this creates a hierarchy or chain of relations between them. The process of a type inheriting 
state and behavior form another is called sub-typing. Not only types can inherit form other types,
they can modify or enhance to their behavior by adding their own and overriding current ones.

#### Prototypal

#### Pseudo-classical


## List

Encapsulation
Polymorphism
Collaborator objects
Single vs multiple inheritance
Mix-ins; mix-ins vs. inheritance
Methods and functions; method invocation vs. function invocation
Higher-order functions
The global object
Method and property lookup sequence
Function execution context and this
    Execution context **resolves** to something, always.
Implicit and explicit execution context
Dealing with context loss
call, apply, and bind
Object.assign and Object.create
Built-in constructors like Array, Object, String and Number
Reading OO code

### How is the term variable used
#### Why are the following treated as variables
- Variables delcared with `let`, `const`.
- Function parameters.
- Function names.
- Class names.
#### Object property names are not variables (why not)



##### Daniel Cosme 02/11/20
