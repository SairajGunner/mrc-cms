var express = require("express");
var fs = require("fs");
const path = require("path");
var uuid = require("uuid");

const router = express.Router();
const filePath = path.join(__dirname, "../database/notes.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Remove expired reminders
removeExpiredReminders = (note) => {
  let newHasReminders = [];
  if (note.hasReminders && note.hasReminders.length > 0) {
    note.hasReminders.forEach((reminder) => {
      if (
        !new Date() > new Date(date.setMonth(note.date.getMonth() + reminder))
      ) {
        newHasReminders.push(reminder);
      }
    });
  }
  note.hasReminders = newHasReminders;
};

// Get all notes
router.get("/get", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});

// Get note by ID
router.get("/get/:id", (req, res) => {
  let notesList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    let requiredNote = JSON.stringify(
      notesList.find((note) => note.id == req.params.id)
    );

    res.setHeader("Content-Type", "application/json");
    res.end(requiredNote);
  });
});

//Get notes by customerId
router.get("/get/customer/:customerId", (req, res) => {
  let notesList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    let requiredNotes = JSON.stringify(
      notesList.filter((note) => note.customerId == req.params.customerId)
    );

    res.setHeader("Content-Type", "application/json");
    res.end(requiredNotes);
  });
});

// Add a new note
router.post("/post", (req, res) => {
  let notesList = [];

  const newNoteData = {
    id: uuid.v4(),
    customerId: req.body.customerId,
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    hasReminders: req.body.hasReminders.filter((reminder) => reminder != null),
    customReminder: req.body.customReminder,
    isCompleted: req.body.isCompleted
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    notesList.push(newNoteData);

    fs.writeFileSync(filePath, JSON.stringify(notesList), "utf-8");

    res.setHeader("Content-Type", "application/json");
    res.end("File Updated!");
  });
});

// Update note by ID
router.put("/update/:id", (req, res) => {
  let notesList = [];

  const noteData = {
    id: req.body.id,
    customerId: req.body.customerId,
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    hasReminders: req.body.hasReminders.filter((reminder) => reminder != null),
    customReminder: req.body.customReminder,
    isCompleted: req.body.isCompleted
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    notesList[notesList.findIndex((note) => note.id == req.params.id)] =
      noteData;

    fs.writeFileSync(filePath, JSON.stringify(notesList), "utf-8");
    res.setHeader("Content-Type", "application/json");
    res.end("Note updated!");
  });
});

// Delete note by ID
router.delete("/delete/:id", (req, res) => {
  let notesList = [];

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    notesList.splice([notesList.findIndex((note) => note.id == req.params.id)]);

    fs.writeFileSync(filePath, JSON.stringify(notesList), "utf-8");

    res.setHeader("Content-Type", "application/json");
    res.end("Note deleted!");
  });
});

module.exports = router;
