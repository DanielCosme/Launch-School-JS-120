function createStudent(name, year) {
  const info = function() {
    console.log('Name:', this.name, '- Year:', this.year);
  }
  
  const addCourse = function(obj) {
    this.courses.push({
      name: obj.name,
      code: String(obj.code),
    }); 
  }

  const listCourses = function() {
    console.log(this.courses);
  }

  const addNote = function(course, note) {
    if (!this.notes[course]) { 
      this.notes[course] = []; 
    }

    this.notes[course].push(note);
  }

  const viewNotes = function() {
    this.courses.forEach(course => {
      let code = course.code;
      let note = this.notes[code];

      if (note) {
        let str = `${course.name}: `;
        let tmp = note.join('; ');
        str += tmp;
        console.log(str);
      }

    }) 
  }

  const updateNote = function(code, note) {
    this.notes[code] = [note];
  }

  return {
    name,
    year,
    courses: [],
    notes: {},
    info,
    addCourse,
    listCourses,
    addNote,
    viewNotes,
    updateNote,
  }
}

function createSchool() {

  const addStudent = function(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      console.log('invalid year');
      return undefined;
    }

    let student = createStudent(name, year);
    this.students.push(student);

    return student;
  }

  const enrollStudent = function(student, course) {
    student.addCourse(course);
  }

  const addGrade = function(student, course, grade) {
    // find the course in student by code    
    let c = student.courses.find(c => c.code === course.code);
    if (c) c.grade = grade;
  }

  const getReportCard = function(student) {
    student.courses.forEach(course => {
      let g = course.grade ? course.grade : 'In progress';

      console.log(`Course: ${course.name}, Grade: ${g}.`)
    })
  }

  const courseReport = function(course) {
    console.log('Grades for', course.name);
    let acc = 0;
    let count = 0;
    this.students.forEach(s => {
      let c = s.courses.find(c => c.code === course.code);
      if (c)  {
        if (c.grade) {
          console.log(`${s.name}'s grade is ${c.grade}`);
          acc += c.grade;
          count++;
        }
      }
    })

    if (count === 0) {
      console.log('undefined');
      return undefined;
    }

    console.log('---');
    let avg = acc / count;
    console.log('Average:', avg);
  }
  
  return {
    students: [],
    addStudent,
    enrollStudent,
    addGrade,
    getReportCard,
    courseReport,
  }
}

let school = createSchool();
let daniel = school.addStudent('Daniel', '3rd');
let laura = school.addStudent('Laura', '1st');
let conchi = school.addStudent('Conchi', '2nd');

let math = { name: 'Math', code: '101'};
let advancedMath = { name: 'Advanced Math', code: '102'};
let physics = { name: 'Physics', code: '202' };



school.enrollStudent(daniel, math);
school.enrollStudent(daniel, advancedMath);
school.enrollStudent(daniel, physics);
school.enrollStudent(laura, math);
school.enrollStudent(conchi, math);
school.enrollStudent(conchi, advancedMath);

school.addGrade(daniel, math, 95);
school.addGrade(daniel, advancedMath, 90);
school.addGrade(laura, math, 91);
school.addGrade(conchi, math, 93);
school.addGrade(daniel, advancedMath, 90);

school.getReportCard(daniel);
school.courseReport(math);
school.courseReport(advancedMath);
school.courseReport(physics);

