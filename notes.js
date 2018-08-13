console.log('Starting notes.js');

const fs = require('fs');

const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = { title, body };

    const duplicateNotes = notes.filter(note => note.title === title);

    if(!duplicateNotes.length) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => fetchNotes();

const getNote = (title) => {
    const notes = fetchNotes();
    return notes.filter(note => note.title === title);
};

const removeNote = (title) => {
    const notes = fetchNotes();
    const newNotes = notes.filter(note => note.title !== title);
    saveNotes(newNotes);
    return notes.length !== newNotes.length;
};

module.exports = {
    addNote,
    getNote,
    removeNote,
    getAll
};
