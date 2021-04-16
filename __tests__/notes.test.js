const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../lib/notes.js");
const { notes } = require('../db/db');

jest.mock('fs');

test("creates an note object", () => {
    const note = createNewNote(
        { title: "Note 1", text: "Test Text" },
            notes
        );

    expect(note.title).toBe("Note 1");
    expect(note.text).toBe("Test Text");
});

test("filters by query", () => {
    const startingNotes = [
        {
            id: "1",
            title: "Title 1",
            text: "Text 1",
        },
        {
            id: "2",
            title: "Title 2",
            text: "Text 2",
        },
    ];

    const updatedNotes = filterByQuery({ title: "Title 1" }, startingNotes);

    expect(updatedNotes.length).toEqual(1);
});

test("finds by id", () => {
    const startingNotes = [
        {
            id: "1",
            title: "Title 1",
            text: "Text 1",
        },
        {
            id: "2",
            title: "Title 2",
            text: "Text 2",
        },
    ];

    const result = findById("2", startingNotes);

    expect(result.title).toBe("Title 2");
});

test("validates text", () => {
    const note = {
        id: "1",
        title: "Title 1",
        text: "Text 1",
    };

    const invalidNote = {
        id: "1",
        title: "Title 1",
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});