var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../database/notes.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Set next reminder date
setReminderDate = (note) => {
  let monthsToAdd = note.hasReminders.length > 0 ? note.hasReminders[0] : 0;
  const date = new Date(date.setMonth(note.date.getMonth() + monthsToAdd));
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
    .replace(/ /g, "-");
  note.nextReminder = formattedDate;
};

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
  console.log(filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    console.log(data);
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
    res.end(requiredNotes);
  });
});

// Add a new note
router.post("/post", (req, res) => {
  let notesList = [];
  const newNoteData = {
    id: req.body.id,
    customerId: req.body.customerId,
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    hasReminders: req.body.hasReminders,
    nextReminder: req.body.nextReminder
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    notesList.push(newNoteData);

    fs.writeFileSync(filePath, JSON.stringify(notesList), "utf-8");

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
    hasReminders: req.body.hasReminders,
    nextReminder: req.body.nextReminder
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    notesList = JSON.parse(data);
    notesList[notesList.findIndex((note) => note.id == req.params.id)] =
      noteData;

    fs.writeFileSync(filePath, JSON.stringify(notesList), "utf-8");

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

    res.end("Note deleted!");
  });
});

module.exports = router;
