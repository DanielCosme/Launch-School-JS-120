/* Create an object factory for a student object. The student object should have the following methods and it should produce the expected results demonstrated in the sample code:

    info: Logs the name and year of the student.
    addCourse: Enrolls student in a course. A course is an object literal that has properties for its name and code.
    listCourses: Returns a list of the courses student has enrolled in.
    addNote: Adds a note property to a course. Takes a code and a note as an argument. If a note already exists, the note is appended to the existing one.
    updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
    viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.
    */

let foo = createStudent('Foo', '1st');
foo.info();
foo.listCourses();
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
foo.updateNote(101, 'Fun course');
foo.viewNotes();


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

