console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const user = os.userInfo();

// console.log(user);
// {
//     uid: 1000,
//     gid: 1000,
//     username: 'prakriti',
//     homedir: '/home/prakriti',
//     shell: '/bin/bash'
// }

// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, (err) => {
//     if (err) {
//         console.log('Unable to write to file');
//     }
// });


// lodash

// console.log(_.isString(true));
// console.log(_.isString('Prakriti Saxena'));
//
// console.log(_.uniq(['Prakriti', 'Saxena', 1, 1, 2, 3, 5, 5, 4]));

// receiving inputs

const titleConfig = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleConfig,
        body: {
            describe: 'Body of the note',
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('remove', 'Remove a note', {
        title: titleConfig,
    })
    .command('read', 'Read a note', {
        title: titleConfig,
    })
    .help()
    .argv;

let command = process.argv[2]; // or use argv._[0]
console.log('Command: ', command);
console.log('All args: ', process.argv);
console.log('All args (with yargs): ', argv);
// node app.js add --title='Secrets 2' --body='This is my secret'

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created: ', note.title);
    } else {
        console.log('Note not created');
    }
} else if (command === 'list') {
    console.log('Getting all notes: ');
    const fetchedNotes = notes.getAll();
    fetchedNotes.forEach(note => {
        console.log('Title: ', note.title, ', Body: ', note.body);
    });
} else if (command === 'read') {
    console.log('Reading Note');
    const note = notes.getNote(argv.title);
    debugger;
    if(note.length) {
        console.log('Note found: ', note[0].title);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    const isRemoved = notes.removeNote(argv.title);
    console.log(isRemoved ? 'Note removed' : 'Note not found');
} else {
    console.log('Command not recognized');
}
//