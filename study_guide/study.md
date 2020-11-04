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
object creation and/or instantiation.


#### Meaning of the concept in the context of JavaScript

Objects are one of the fundamental types in JavaScript.

They are first and foremost data structures that hold `{key, value}` pairs, where the keys are 
always `strings` and the **values** can be of any type/value.

JavaScript builds on top of this data structure in order to be able to write object oriented 
programs. JS does this by adding some characteristics, functionality and specific methods in 
`Object.prototype` in order to allow programmers to write object oriented programs.

An example of how to create an object in JavaScript:
```javascript
{} // this is an object literal
const obj = {}; 
const obj2 = new Object(); // created using the new keyword
console.log(obj, obj2);
```
#### Object Factories 
Functions that have the specific purpose of creating other objects. This functions
return objects, and take as input the desired state. They are part of **Object Creation patterns**

**Pro:**
The problem they solve is the creation of objects that are the same type, by type
I mean objects with the same state and behavior. 

Also of course code reuse.

**Con:**
All objects created by the factory will have their behaviors (methods) duplicated in memory,
creating code duplication in memory. This happens because each object will have its own version
of the method, this is wasteful in terms of memory consumption.

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
let fac = person('Daniel', 'Montreal');
fac.getInfo();
```
#### Constructors
A special type of function whose purpose is the creation of objects. It has several differences
with the object factories.

First of all, a constructor function is invoked using the `new` keyword, and is expected to return
and object from the function. They are capitalized by convention. Example:
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
console.log('Is daniel a person?', Person.prototype.constructor === Person); // true
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
- Objects be default will have `Object.prototype` as their prototype.

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
Refers to objects linking to other objects.

```javascript

```
Execution context **resolves** to something, always.

ES6 classes

## List

Methods and properties; instance and static methods and properties
Prototypal and pseudo-classical inheritance
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
