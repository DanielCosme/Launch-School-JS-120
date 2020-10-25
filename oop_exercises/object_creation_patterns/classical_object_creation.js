function Person(fn, ln, age, gender) {
  this.firstName = fn;
  this.lastName = ln;
  this.age = age;
  this.gender = gender;
}

Person.prototype = {
  fullName() { return this.firstName + ' ' +this.lastName; },
  communicate() { console.log('Communicating') },
  eat() { console.log('Eating'); },
  sleep() {console.log('Sleeping') },
} 

Person.prototype.constructor = Person;

function Doctor(fn, ln, age, gender, sp) {
  Person.call(this, fn, ln, age, gender);
  this.specialization = sp;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.diagnose = function () { console.log('Diagnosing') };
Doctor.prototype.constructor = Doctor;

function Professor(fn, ln, age, gender, subject) {
  Person.call(this, fn, ln, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.teach = function () { console.log('Teaching') };
Professor.prototype.constructor = Professor;

function Student(fn, ln, age, gender, degree) {
  Person.call(this, fn, ln, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = function () { console.log('Studying') };
Student.prototype.constructor = Student;

function GraduateStudent(fn, ln, age, gender, graduateDegree) {
  Person.call(this, fn, ln, age, gender);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.research = function () { console.log('Researching') };
GraduateStudent.prototype.constructor = GraduateStudent;


let person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'
