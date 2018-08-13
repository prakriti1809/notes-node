let obj = {
    name: 'Prakriti'
};

let stringObj = JSON.stringify(obj);

console.log(typeof stringObj);
console.log('stringObj: ', stringObj);

let personString = '{ "name": "Prakriti", "age": 27 }';
let person = JSON.parse(personString);

console.log('personString: ', personString);
console.log('typeof ', typeof person, 'person: ', person);


const fs = require('fs');

let originalNote = {
    title: 'Some title',
    body: 'Some body'
};

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');

let note = JSON.parse(noteString);

console.log('typeof note: ', typeof note);
console.log('note title: ', note.title);