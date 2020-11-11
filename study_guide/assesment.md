# 1
Encapsulation in JavaScript refers to the practice of putting together related code 
into an entity, in Object Oriented programs this entity is an Object. The data that is
put together is state and behavior.

It is very useful to use encapsulation because it allows for programs to be better structured, due to all relevant pieces of functionality (state & behavior) grouped toghether.

The concept differs in the context of other programming languages in the inmediate
meaning of the word. Encapsulation in other Object Oriented languages is mainly about data hiding, meaning restricting access to properties of the object from code outside of it. In contrast, in JavaScript encapsulation enables data hiding, but its meaning
is about the grouping of related data toghether.

# 2
The difference is that static methods belong to the type, meaning is common for all 
instances of that type; instance methods belong to the Object (instance) and are called to act upon state of it.

- Static methods are invoked directly from the class/constructor like so: `Array.isArray()`
- Instance methods are invoked from the actual object like so: 
```javascript
let arr = [1,2];
arr.push(3);
```
One would use a static method when the action or the state to be acted upon is common
for all instances of that type, for example:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  static function getLifespan() { return 90 }
  function greet() {
    console.log("Hello my name is ", this.name);
  }
}

let p1 = new Person('Daniel');
let p2 = new Person('Laura');
p1.greet(); // Daniel
p2.greet(); // Laura

Person.getLifespan(); // returns 90.
```
On lines 13 and 14 we call instance methods on two diffent objects that act on state
specific to that particular object.

On line 16 we invoke a static method to return information (state) that will be the 
same for all Persons.


# 3

Methods `call` and `apply` are used to provide explicit execution context into a 
function or method. both of them have the same functionality but differ on how arguments are passed into them. The return value of them is the function invoked 
with the execution evaluating to the first agument passed into `apply` or `call`.

- `Call` first argument is the desired context, the rest of the arguments are the original arguments for the function. 
- `Apply` works in the same way but only two arguments are passed, the context and an 
array with the arguments to the function.

Example:
```javascript
function greet(arg1, arg2) {
  console.log('Hello my name is', this.name , "and I live in" , this.location);
  console.log('I like', arg1, "and", arg2);
}

function Person(name, location) {
  this.name = name;
  this.location = location;
}

let obj = new Person('Daniel', 'Montreal');
let obj2 = new Person('Laura', 'Laval');

greet.call(obj, 'Computers', "Cycling"); // call
greet.apply(obj2, ['Makeup', 'Telenovelas']); // apply
```
# 1
I would invoke the function with the `bind` method which will not run the method but create a new function with the context permanently bound to the object.
```javascript
const logName = person.printName.bind(person); // new line 8.
```
# 5
The problem here is that **context is lost** due to the nested function passed into the filter method.

First solution, provide context by passing `this` to the filter `thisArgs` parameter on line .
```javascript
let compare = {
  number: 10,
  compareNumbers(nums) {
    return nums.filter(function(num) {
      return num < this.number;
    }, this); // HERE
  },
};
```
Second solution, use an arrow function which uses the outer scope to get its context.
```javascript
let compare = {
  number: 10,
  compareNumbers(nums) {
    return nums.filter((num) => { // HERE
      return num < this.number;
    });
  },
};
```

# 6
# In the context of Objects 
When a property or method is attempted to be acceded from within an object and it is not found,
JavaScript will start to look for it on the `[[Prototype]]` object; if not found there is going to 
keep looking for it on the prototypal chain. The lookup sequence represents
the order in which the member is going to be searched on the prototypal chain. The lookup will stop
if the member is found. Search will stop if the member if found or there are no more prototypes (objects),
to look into, this usually ends up on `Object.prototype.__proto__` which is `null`.


# 7
The fundamental difference is that objects instantiated using pseudo-classical inheritance will inherit
from the property `prototype` present in its constructor (function); objects created using protodypal delegation will
inherit directly from a prototype object explicitly assigned at thet time of creating it.

The difference seems almost non-existant, however the difference is big in terms of the way the objects are created.

- In pseudo classical Objects are instantiated from a constructor function invocation.
- In prototypal delegation Objects are created directly from the prototype object.

They are related in the sense that in both aproaches the prototypal nature of JavaSctip objects is leveraged to 
implement inheritance, meaning in both cases the resulting objects have a prototype to refer to for method/property lookup.





# 8
Both practices accomplish the objective of object extensibility, they differ in the way of accomplishing this goal.

The main difference is that inheritance uses delegation that comes from a prototypal chain, so if I want to **extend** the
object `Person` inheritance will tell me to create a "child" of `Person` and work on (extend) it a my pleasure; on the other hand
the mix-in pattern will tell me to **extend** my `Person` by composition, meaning adding/appending the desired state or behavior
from other object.

A mix-in is an Object whose main purpose is to add additional functionality to other objects by 
composition, meaning a **has-a** relationship exist as opposed to a **is-a** relationship (Inheritance).

We use mix-ins for **has-a** relations and inheritance for **is-a**.

Is better to explain on an example:
```javascript
class Organic {
  constructor() {}
  grow() {
    console.log('Growing');
  }
}

class Robot { }

const movable = { // MIX-IN
  move() {
    console.log(this.__proto__.constructor.name, 'Moving');
  }
}

class Person extends Organic { } // Get grow from Organic (inheritance)
// a person IS A Organic type

let human = new Person();
human.grow();

let robo = new Robot();
Object.assign(Person.prototype, movable);
Object.assign(Robot.prototype, movable);
human.move();
robo.move();
```



# 9
What happens is that the function will be invoked as a `constructor` function, when invoked in such a way
functions will **bind their execution context** to a new object, run the code within the body of the function, and then return that object.

If the function has a return statement the constructor will use it if the return 'value' is an object, if it is a primitive it will
ignore the return action and implicitly return the a reference to `this`. If there is no return value the constructor will implicitly 
return 'this'


# 10
We can because JavaScript will **wrap the primitives** (coerce) into its object form, e.g. `number` to `Number`.
After being wrapped, a method will be invoked like `str.split()` and the result will be **un-wrapped** from the object
to the primitive form, for example: `String` to `string`.

This is useful as an abdtraction to be able to group toghteger related actions to promitives without violating their 
atomic nature.

# 11

The first difference relies in the fact that all objects instantiated from factories have copies of their methods, as opposed to 
classes and constructors instances which delegate method invocations to a single object (prototype).

The second is that objects from factories cannot check for relationships with other objects, meaning there is now way to know
if two objects where created by the same factory (are the same type). Classes/constructors can check for relationships via the
`instanceof` operator which will return true or false depending on the nature of the relation between the objects.

# 12
Is ability of being able to invoke code while being indifferent from its type and/or implementation.
Polymorphism only concerns with the interface being used to invoke code, not its particular
implementation, meaning that calling code will only concern with the presence of the expected 
behavior, in most cases it is all about the presence of a method.

There are two ways to enable the use of polymorphism:

- Inheritance (sub-classing).
- Composition (composition).

With *inheritance* different objects get the related behavior vie their ancestry, but the implementation might differ, 
nevertheless the invoking code will agnostic to it, it will only look for the expected interface. Is about invoking code on objects of different types that are related to one another via inheritance.

With *composition* we can use mix-ins to add related behavor to no so related types and now those types will
be able to be called from the newly added behavior.

Example with inheritance.
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
  // All entities can move, but they move in a different way.
  entity.move(); // HERE IS WHERE POLYMORPHISM OCCURS
}

arr.forEach(moveEntities);
/* logs
I move like a Robot
I move like a Human
I move like a Entity
*/
```

# 13
```javascript
let plane = {
  passengers: 220
};

let flyingMachine = {
  fly() {
    console.log(`Off we go with ${this.passengers} passengers!`);
  }
};

// new code
plane.fly = flyingMachine.fly;
// new code

plane.fly();
```
# 14
```javascript
let contacts = {
  list: [],
  add(name, gender) {
    let contact = new Contact(name, gender);
    this.list.push(contact);
  },
  males() {
    return this.list.filter(function(contact) {
      return contact.gender === 'male';
     });
  },
  females() {
    return this.list.filter(function(contact) {
      return contact.gender === 'female';
    });
  },
  filterByName(name) {
    return this.list.filter(function(contact) {
      return contact.hasName(name);
    });
  },
};

// New code
function Contact(name, gender) {
  this.name = name;
  this.gender = gender;
}

Contact.prototype.hasName = function (name) {
  return this.name === name;
}

// Tests
contacts.add('Daniel', 'male');
contacts.add('Laura', 'female');
console.log(contacts.males());
console.log(contacts.females());
console.log(contacts.filterByName('Daniel'));
```
# 15

# 1