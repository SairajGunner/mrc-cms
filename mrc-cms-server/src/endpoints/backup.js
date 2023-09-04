var express = require("express");
var fs = require("fs");
const path = require("path");

const router = express.Router();
const customersFilePath = path.join(__dirname, "../database/customers.json");
const customersBackupFilePath = path.join(
  __dirname,
  "../database/backup/customers.json"
);
const engagementsFilePath = path.join(
  __dirname,
  "../database/engagements.json"
);
const engagementsBackupFilePath = path.join(
  __dirname,
  "../database/backup/engagements.json"
);
const notesFilePath = path.join(__dirname, "../database/notes.json");
const notesBackupFilePath = path.join(
  __dirname,
  "../database/backup/notes.json"
);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Search Everything
router.get("/update", (req, res) => {
  fs.readFile(customersFilePath, (err, data) => {
    fs.writeFileSync(customersBackupFilePath, data, "utf-8");
  });

  fs.readFile(engagementsFilePath, (err, data) => {
    fs.writeFileSync(engagementsBackupFilePath, data, "utf-8");
  });

  fs.readFile(notesFilePath, (err, data) => {
    fs.writeFileSync(notesBackupFilePath, data, "utf-8");
  });

  res.sendStatus(200);
});

module.exports = router;
