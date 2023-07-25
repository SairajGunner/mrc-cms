var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../database/notes.json");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/get", function (req, res) {
  console.log(filePath);

  fs.readFile(filePath, "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

router.post("/post", function (req, res) {
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

module.exports = router;
